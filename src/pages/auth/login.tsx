import { useState } from 'react';
import { useAuth } from '@hooks/useAuth';
import { AuthLayout } from '@components/auth/AuthLayout';
import ButtonCard from '@components/ButtonCard';
import { InputField } from '@components/InputField';

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      await login(formData.username, formData.password);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  return (
    <AuthLayout
      title="Login to your account"
      footerText="Don't have an account?"
      footerLink="/register"
      footerLinkText="Register"
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
          name="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        <ButtonCard
          type="submit"
          loading={loading}
          disabled={loading} 
          size="medium"
          className="w-full"
        >
          {loading ? 'Logging in...' : 'Login'}
        </ButtonCard>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;