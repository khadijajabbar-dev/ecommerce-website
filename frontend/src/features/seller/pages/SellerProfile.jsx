import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import sellerService from "../services/seller.service";
import { uploadImageAPI } from "../../../api/upload.api";
import { Alert, Card, Button, EditableField, InfoRow, Navbar } from "../../../shared/components";
import { CATEGORIES } from "../../../shared/constants/categories";

const CATEGORY_OPTIONS = CATEGORIES.map(({ value, label }) => ({ value, label }));

const BUSINESS_TYPE_OPTIONS = [
  { value: "individual", label: "Individual" },
  { value: "partnership", label: "Partnership" },
  { value: "company", label: "Company" },
];

const SellerProfile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const [imageError, setImageError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setPageError("");
      try {
        const result = await sellerService.getMe();
        setUser(result.user);
      } catch (err) {
        setPageError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const savePersonalField = async (field, newValue) => {
    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      address: user.address,
      city: user.city,
      profileImage: user.profileImage || "",
      [field]: newValue,
    };
    const result = await sellerService.updateProfile(payload);
    setUser(result.user);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageError("");
    setUploadingImage(true);
    try {
      const uploaded = await uploadImageAPI(file);
      const result = await sellerService.updateProfile({
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

  const saveStoreField = async (field, newValue) => {
    const payload = {
      storeName: user.storeProfile?.storeName || "",
      storeDescription: user.storeProfile?.storeDescription || "",
      storeCategory: user.storeProfile?.storeCategory || "",
      businessType: user.storeProfile?.businessType || "",
      storeAddress: user.storeProfile?.storeAddress || "",
      storeCity: user.storeProfile?.storeCity || "",
      ntnNumber: user.storeProfile?.ntnNumber || "",
      [field]: newValue,
    };
    const result = await sellerService.setupStoreProfile(payload);
    setUser(result.user);
  };

  const handleDeleteAccount = async () => {
    setDeleteError("");
    setDeleting(true);
    try {
      await sellerService.deleteAccount();
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/", { replace: true });
    } catch (err) {
      setDeleteError(err.message || "Failed to delete account");
      setDeleting(false);
    }
  };

  const initials = user
    ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase()
    : "S";

  return (
    <main className="min-h-screen bg-[#fbfdfc] px-4 py-5 text-[#17233f] sm:px-5 sm:py-6">
      <div className="mx-auto max-w-3xl">
        <Navbar badge="S" panel="Seller Panel" title="My Profile" avatarUrl={user?.profileImage} />

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
                  onSave={(v) => savePersonalField("firstName", v)}
                />
                <EditableField
                  label="Last Name"
                  value={user.lastName}
                  onSave={(v) => savePersonalField("lastName", v)}
                />

                {/* Email is intentionally NOT editable — no pencil icon */}
                <InfoRow label="Email Address" value={user.email} />

                <EditableField
                  label="Phone Number"
                  value={user.phone}
                  onSave={(v) => savePersonalField("phone", v)}
                />
                <EditableField
                  label="Address"
                  value={user.address}
                  onSave={(v) => savePersonalField("address", v)}
                />
                <EditableField
                  label="City"
                  value={user.city}
                  onSave={(v) => savePersonalField("city", v)}
                />
              </div>
            </Card>

            {user.isStoreSetup && (
              <Card className="mt-6 p-5 sm:p-6">
                <div className="mb-5">
                  <h3 className="text-xl font-extrabold">Store Information</h3>
                  <p className="mt-1 text-sm text-body">
                    Keep your public store details current for buyers.
                  </p>
                </div>

                <div className="space-y-3">
                  <EditableField
                    label="Store Name"
                    value={user.storeProfile?.storeName}
                    onSave={(v) => saveStoreField("storeName", v)}
                  />
                  <EditableField
                    label="Store Description"
                    as="textarea"
                    value={user.storeProfile?.storeDescription}
                    onSave={(v) => saveStoreField("storeDescription", v)}
                  />
                  <EditableField
                    label="Store Category"
                    as="select"
                    options={CATEGORY_OPTIONS}
                    value={user.storeProfile?.storeCategory}
                    onSave={(v) => saveStoreField("storeCategory", v)}
                  />
                  <EditableField
                    label="Business Type"
                    as="select"
                    options={BUSINESS_TYPE_OPTIONS}
                    value={user.storeProfile?.businessType}
                    onSave={(v) => saveStoreField("businessType", v)}
                  />
                  <EditableField
                    label="Store Address"
                    value={user.storeProfile?.storeAddress}
                    onSave={(v) => saveStoreField("storeAddress", v)}
                  />
                  <EditableField
                    label="Store City"
                    value={user.storeProfile?.storeCity}
                    onSave={(v) => saveStoreField("storeCity", v)}
                  />
                  <EditableField
                    label="NTN / Tax Number"
                    value={user.storeProfile?.ntnNumber}
                    onSave={(v) => saveStoreField("ntnNumber", v)}
                  />
                </div>
              </Card>
            )}

            <Card className="mt-6 p-5 sm:p-6">
              {deleteError && (
                <Alert variant="error" className="mb-4">
                  {deleteError}
                </Alert>
              )}

              {!confirmingDelete ? (
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button onClick={handleLogout} variant="secondary" size="lg" fullWidth>
                    Log Out
                  </Button>
                  <Button
                    onClick={() => setConfirmingDelete(true)}
                    variant="danger"
                    size="lg"
                    fullWidth
                  >
                    Delete Account
                  </Button>
                </div>
              ) : (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                  <p className="text-sm font-bold text-red-600">
                    Are you sure? This will permanently delete your account and every
                    product you've listed. This cannot be undone.
                  </p>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <Button
                      onClick={handleDeleteAccount}
                      variant="danger"
                      size="lg"
                      fullWidth
                      disabled={deleting}
                    >
                      {deleting ? "Deleting..." : "Yes, Delete My Account"}
                    </Button>
                    <Button
                      onClick={() => setConfirmingDelete(false)}
                      variant="ghost"
                      size="lg"
                      fullWidth
                      disabled={deleting}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </>
        )}
      </div>
    </main>
  );
};

export default SellerProfile;