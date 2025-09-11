import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Phone, 
  Mail, 
  Car, 
  MapPin, 
  Calendar,
  Search,
  Filter,
  Download,
  CheckCircle,
  Clock,
  XCircle,
  LogOut,
  Trash2,
  MessageSquare,
  Settings,
  Edit3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { useToast } from '../../hooks/use-toast';
import ContentEditor from './ContentEditor';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const QuoteManagement = ({ onLogout }) => {
  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [showContentEditor, setShowContentEditor] = useState(false);
  const { toast } = useToast();

  // Show content editor
  if (showContentEditor) {
    return <ContentEditor onBack={() => setShowContentEditor(false)} />;
  }

  useEffect(() => {
    fetchQuotes();
  }, []);

  useEffect(() => {
    filterQuotes();
  }, [quotes, searchTerm, statusFilter]);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/quotes`);
      setQuotes(response.data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      toast({
        title: "Error",
        description: "Failed to fetch quotes",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterQuotes = () => {
    let filtered = quotes;

    if (searchTerm) {
      filtered = filtered.filter(quote => 
        quote.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.phone.includes(searchTerm) ||
        quote.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(quote => quote.status === statusFilter);
    }

    setFilteredQuotes(filtered);
  };

  const updateQuoteStatus = async (quoteId, newStatus) => {
    try {
      await axios.patch(`${API}/quotes/${quoteId}`, { status: newStatus });
      setQuotes(quotes.map(quote => 
        quote.id === quoteId ? { ...quote, status: newStatus } : quote
      ));
      toast({
        title: "Status Updated",
        description: `Quote marked as ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating quote status:', error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'contacted':
        return <Badge variant="default" className="bg-blue-100 text-blue-800"><Phone className="h-3 w-3 mr-1" />Contacted</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const exportToCSV = () => {
    const csvData = [
      ['Name', 'Email', 'Phone', 'Vehicle Type', 'Services', 'Location', 'Message', 'Status', 'Created At'],
      ...filteredQuotes.map(quote => [
        quote.name,
        quote.email,
        quote.phone,
        quote.vehicleType,
        quote.services.join('; '),
        quote.location,
        quote.message,
        quote.status,
        new Date(quote.createdAt).toLocaleDateString()
      ])
    ];

    const csvContent = csvData.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quotes_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const deleteQuote = async (quoteId) => {
    if (!window.confirm('Are you sure you want to delete this quote? This action cannot be undone.')) {
      return;
    }
    
    try {
      await axios.delete(`${API}/quotes/${quoteId}`);
      setQuotes(quotes.filter(quote => quote.id !== quoteId));
      toast({
        title: "Quote Deleted",
        description: "Quote request has been permanently deleted",
      });
    } catch (error) {
      console.error('Error deleting quote:', error);
      toast({
        title: "Error",
        description: "Failed to delete quote",
        variant: "destructive"
      });
    }
  };
    localStorage.removeItem('admin_logged_in');
    onLogout(false);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded font-bold text-lg">
                ZAZ
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
                <p className="text-slate-600">Quote Management System</p>
              </div>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Quotes</p>
                  <p className="text-3xl font-bold text-slate-800">{quotes.length}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600">{quotes.filter(q => q.status === 'pending').length}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Contacted</p>
                  <p className="text-3xl font-bold text-blue-600">{quotes.filter(q => q.status === 'contacted').length}</p>
                </div>
                <Phone className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{quotes.filter(q => q.status === 'completed').length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search quotes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={exportToCSV} className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export CSV</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quotes Table */}
        <Card>
          <CardHeader>
            <CardTitle>Quote Requests ({filteredQuotes.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold text-slate-700">Customer</th>
                    <th className="text-left p-4 font-semibold text-slate-700">Contact</th>
                    <th className="text-left p-4 font-semibold text-slate-700">Vehicle</th>
                    <th className="text-left p-4 font-semibold text-slate-700">Services</th>
                    <th className="text-left p-4 font-semibold text-slate-700">Status</th>
                    <th className="text-left p-4 font-semibold text-slate-700">Date</th>
                    <th className="text-left p-4 font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuotes.map((quote) => (
                    <tr key={quote.id} className="border-b hover:bg-slate-50">
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-slate-800">{quote.name}</p>
                          {quote.location && (
                            <p className="text-sm text-slate-600 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {quote.location}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <p className="text-sm flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            <a href={`mailto:${quote.email}`} className="text-blue-600 hover:underline">
                              {quote.email}
                            </a>
                          </p>
                          <p className="text-sm flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            <a href={`tel:${quote.phone}`} className="text-blue-600 hover:underline">
                              {quote.phone}
                            </a>
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <Car className="h-4 w-4 mr-2 text-slate-400" />
                          <span className="text-sm">{quote.vehicleType}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="max-w-48">
                          {quote.services.slice(0, 2).map((service, index) => (
                            <Badge key={index} variant="outline" className="mr-1 mb-1 text-xs">
                              {service}
                            </Badge>
                          ))}
                          {quote.services.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{quote.services.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        {getStatusBadge(quote.status)}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center text-sm text-slate-600">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(quote.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedQuote(quote)}
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Quote Request Details</DialogTitle>
                              </DialogHeader>
                              {selectedQuote && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium text-slate-600">Customer Name</label>
                                      <p className="text-slate-800">{selectedQuote.name}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-slate-600">Email</label>
                                      <p className="text-slate-800">{selectedQuote.email}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-slate-600">Phone</label>
                                      <p className="text-slate-800">{selectedQuote.phone}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-slate-600">Vehicle Type</label>
                                      <p className="text-slate-800">{selectedQuote.vehicleType}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-slate-600">Location</label>
                                      <p className="text-slate-800">{selectedQuote.location || 'Not specified'}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-slate-600">Status</label>
                                      <p className="text-slate-800">{getStatusBadge(selectedQuote.status)}</p>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <label className="text-sm font-medium text-slate-600">Services Requested</label>
                                    <div className="mt-2 space-y-1">
                                      {selectedQuote.services.map((service, index) => (
                                        <Badge key={index} variant="outline" className="mr-2 mb-1">
                                          {service}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>

                                  {selectedQuote.message && (
                                    <div>
                                      <label className="text-sm font-medium text-slate-600">Message</label>
                                      <p className="text-slate-800 bg-slate-50 p-3 rounded mt-2">{selectedQuote.message}</p>
                                    </div>
                                  )}

                                  <div className="flex space-x-2 pt-4">
                                    <Button 
                                      onClick={() => updateQuoteStatus(selectedQuote.id, 'contacted')}
                                      className="bg-blue-600 hover:bg-blue-700"
                                    >
                                      Mark as Contacted
                                    </Button>
                                    <Button 
                                      onClick={() => updateQuoteStatus(selectedQuote.id, 'completed')}
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      Mark as Completed
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          
                          {quote.status === 'pending' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateQuoteStatus(quote.id, 'contacted')}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Phone className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredQuotes.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                  <p>No quote requests found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuoteManagement;