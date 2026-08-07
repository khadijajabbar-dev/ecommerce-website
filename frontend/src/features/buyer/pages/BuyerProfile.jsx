import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import buyerUserService from "../services/user.service";
import { uploadImageAPI } from "../../../api/upload.api";
import { Alert, Card, Button, EditableField, InfoRow, Navbar, PublicNavbar } from "../../../shared/components";

const BuyerProfile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [imageError, setImageError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("auth-changed"));
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setPageError("");
      try {
        const result = await buyerUserService.getMe();
        setUser(result.user);
      } catch (err) {
        setPageError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const saveField = async (field, newValue) => {
    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      address: user.address,
      city: user.city,
      profileImage: user.profileImage || "",
      [field]: newValue,
    };
    const result = await buyerUserService.updateProfile(payload);
    setUser(result.user);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageError("");
    setUploadingImage(true);
    try {
      const uploaded = await uploadImageAPI(file);
      const result = await buyerUserService.updateProfile({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        address: user.address,
        city: user.city,
        profileImage: uploaded.url,
      });
      setUser(result.user);
    } catch (err) {
      setImageError(err.message || "Failed to upload profile image");
    } finally {
      setUploadingImage(false);
    }
  };

  const initials = user
    ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase()
    : "B";

  return (
    <main className="min-h-screen bg-page text-heading">
      <PublicNavbar />
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-5">
        <Navbar
          badge="B"
          panel="Buyer Panel"
          title="My Profile"
          actions={
            <>
              <Link to="/buyer/orders">
                <Button variant="secondary">My Orders</Button>
              </Link>
              <Link to="/buyer/cart">
                <Button variant="secondary">Cart</Button>
              </Link>
            </>
          }
          onLogout={handleLogout}
        />

        {loading ? (
          <Card className="mt-6 p-8 text-center text-sm font-semibold text-body">
            Loading your profile...
          </Card>
        ) : pageError && !user ? (
          <Alert variant="error" className="mt-6">
            {pageError}
          </Alert>
        ) : (
          <>
            <Card className="mt-6 p-5 sm:p-6">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                <div className="relative">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="h-28 w-28 rounded-3xl object-cover ring-4 ring-blue-100"
                    />
                  ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-primary text-3xl font-black text-white ring-4 ring-blue-100">
                      {initials}
                    </div>
                  )}
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-extrabold text-heading">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="mt-1 text-sm text-body">{user.email}</p>
                  <label className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white transition hover:bg-primary">
                    {uploadingImage ? "Uploading..." : "Change Profile Photo"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                      disabled={uploadingImage}
                    />
                  </label>
                  {imageError && (
                    <p className="mt-2 text-xs font-semibold text-red-600">{imageError}</p>
                  )}
                </div>
              </div>
            </Card>

            <Card className="mt-6 p-5 sm:p-6">
              <div className="mb-5">
                <h3 className="text-xl font-extrabold">Personal Information</h3>
                <p className="mt-1 text-sm text-body">
                  Tap the pencil icon on any field to update it.
                </p>
              </div>

              <div className="space-y-3">
                <EditableField
                  label="First Name"
                  value={user.firstName}
                  onSave={(v) => saveField("firstName", v)}
                />
                <EditableField
                  label="Last Name"
                  value={user.lastName}
                  onSave={(v) => saveField("lastName", v)}
                />
                <InfoRow label="Email Address" value={user.email} />
                <EditableField
                  label="Phone Number"
                  value={user.phone}
                  onSave={(v) => saveField("phone", v)}
                />
                <EditableField
                  label="Address"
                  value={user.address}
                  onSave={(v) => saveField("address", v)}
                />
                <EditableField
                  label="City"
                  value={user.city}
                  onSave={(v) => saveField("city", v)}
                />
              </div>
            </Card>

            <Card className="mt-6 p-5 sm:p-6">
              <Button onClick={handleLogout} variant="secondary" size="lg" fullWidth>
                Log Out
              </Button>
            </Card>
          </>
        )}
      </div>
    </main>
  );
};

export default BuyerProfile;
