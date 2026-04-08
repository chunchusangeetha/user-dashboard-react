import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addUser, getUser, updateUser, getUsers } from "../services/api";
import Loader from "../components/common/Loader";
import Input from "../components/common/Input";
import { initialUserData, userFormControls } from "../utils/FormConstants";

export default function AddEditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = Boolean(id);

  const [formData, setFormData] = useState(initialUserData);

  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      getUser(id)
        .then((data) => setFormData(data))
        .catch(() => setError("Failed to load user"))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const validate = () => {
    if (
      !formData.name &&
      !formData.email &&
      !formData.phone &&
      !formData.company &&
      !formData.city
    ) {
      return "Please fill the below details";
    }
    if (!formData.name) return "Name is required";
    if (!formData.email.includes("@")) return "Invalid email";
    if (!formData.phone || formData.phone.toString().length !== 10) {
      return "Phone number must be exactly 10 digits";
    }
    if (!formData.company) return "Company is required";
    if (!formData.city) return "City is required";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      if (isEdit) {
        await updateUser(id, formData);
      } else {
        const existingUsers = await getUsers();
        const emailExists = existingUsers.some(
          (user) => user.email.toLowerCase() === formData.email.toLowerCase(),
        );

        if (emailExists) {
          setError("This email is already registered.");
          return;
        }
        await addUser(formData);
      }

      navigate("/users", { state: { refresh: true } });
    } catch (err) {
      setError("Something went wrong");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-pink-300 p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isEdit ? "Edit User" : "Add User"}
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {userFormControls.map((currentItem) => (
            <div key={currentItem.name} className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">
                {currentItem.label}
              </label>

              <Input
                currentItem={currentItem}
                value={formData[currentItem.name]}
                onChange={handleChange}
              />
            </div>
          ))}

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition mt-2"
          >
            {isEdit ? "Update User" : "Add User"}
          </button>
        </form>
      </div>
    </div>
  );
}
