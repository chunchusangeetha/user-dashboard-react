import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addUser, getUser, updateUser,getUsers } from "../services/api";
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
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">
        {isEdit ? "Edit User" : "Add User"}
      </h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {userFormControls.map((currentItem) => (
          <div key={currentItem.name} className="flex flex-col gap-1">
            <label className="text-sm font-semibold">{currentItem.label}</label>
            <Input
              currentItem={currentItem}
              value={formData[currentItem.name]}
              onChange={handleChange}
            />
          </div>
        ))}

        <button type="submit" className="bg-green-500 text-white py-2 rounded">
          {isEdit ? "Update User" : "Add User"}
        </button>
      </form>
    </div>
  );
}
