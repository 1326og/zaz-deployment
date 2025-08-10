import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useToast } from '../../hooks/use-toast';

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple authentication - you can enhance this with proper backend auth
    if (credentials.username === 'admin' && credentials.password === 'zaz2025!') {
      localStorage.setItem('admin_logged_in', 'true');
      onLogin(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader className="text-center">
          <div className="relative mx-auto w-fit mb-4">
            {/* Shield-style logo for admin */}
            <div className="bg-gradient-to-b from-orange-500 to-orange-600 px-6 py-3 rounded-lg shadow-xl border-2 border-orange-400/50">
              <div className="text-white font-black text-2xl tracking-wider">
                ZAZ
              </div>
            </div>
            {/* Bottom section */}
            <div className="bg-slate-800 text-white px-4 py-1 rounded-b-lg -mt-1">
              <div className="text-xs font-bold tracking-wide text-center">PRECISION</div>
              <div className="text-xs font-medium tracking-wider text-center -mt-0.5">AUTO DETAILING</div>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-white">Admin Dashboard</CardTitle>
          <p className="text-slate-300">Access your quote management system</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <User className="h-4 w-4 inline mr-2" />
                Username
              </label>
              <Input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                placeholder="Enter admin username"
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-orange-400 focus:ring-orange-400/20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Lock className="h-4 w-4 inline mr-2" />
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  placeholder="Enter admin password"
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-orange-400 focus:ring-orange-400/20 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 text-lg rounded-lg transform hover:scale-105 transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-600">
            <h4 className="text-sm font-medium text-white mb-2">Default Credentials:</h4>
            <p className="text-xs text-slate-300">Username: <span className="text-orange-400">admin</span></p>
            <p className="text-xs text-slate-300">Password: <span className="text-orange-400">zaz2025!</span></p>
            <p className="text-xs text-slate-400 mt-2">Change these credentials in production</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;