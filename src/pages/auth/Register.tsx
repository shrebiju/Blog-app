import { useState } from 'react';
import { useAuth } from '@hooks/useAuth';
import { AuthLayout } from '@components/auth/AuthLayout';
import ButtonCard from '@components/ButtonCard';
import { InputField } from '@components/InputField';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await register(
        formData.username,
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName
      );
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <AuthLayout
      title="Create an account"
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Sign in"
    >
      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded text-sm text-center">
          {error}
        </div>
      )}
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <InputField
          name="username"
          label="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
    
        <InputField
          name="email"
          type="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
    
        <InputField
          name="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <InputField
            name="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <InputField
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <ButtonCard
          type="submit"
          loading={loading}
          disabled={loading} 
          size="medium"
          className="w-full"
        >
          Register
        </ButtonCard>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;