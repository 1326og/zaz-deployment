import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Edit3, 
  Plus, 
  Trash2, 
  ArrowLeft,
  FileText,
  Settings,
  Palette
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useToast } from '../../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContentEditor = ({ onBack }) => {
  const [content, setContent] = useState({});
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [newService, setNewService] = useState({
    title: '',
    description: '', 
    features: [''],
    active: true,
    order: 0
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Sample editable content sections
  const contentSections = [
    { 
      section: 'hero',
      field: 'title',
      label: 'Hero Title',
      type: 'text',
      placeholder: 'ZAZ PRECISION AUTO DETAILING'
    },
    {
      section: 'hero', 
      field: 'subtitle',
      label: 'Hero Subtitle',
      type: 'textarea',
      placeholder: 'Professional mobile car detailing services...'
    },
    {
      section: 'about',
      field: 'title', 
      label: 'About Section Title',
      type: 'text',
      placeholder: 'Premium Mobile Auto Detailing'
    },
    {
      section: 'about',
      field: 'description',
      label: 'About Description',
      type: 'textarea',
      placeholder: 'At Zaz Precision Auto Detailing LLC...'
    },
    {
      section: 'contact',
      field: 'phone',
      label: 'Phone Number',
      type: 'text', 
      placeholder: '(973) 534-0023'
    },
    {
      section: 'contact',
      field: 'email',
      label: 'Email Address',
      type: 'text',
      placeholder: 'zazprecisionautodetailingllc@gmail.com'
    }
  ];

  useEffect(() => {
    fetchContent();
    fetchServices();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get(`${API}/content`);
      const contentMap = {};
      response.data.forEach(item => {
        const key = `${item.section}_${item.field}`;
        contentMap[key] = item.content;
      });
      setContent(contentMap);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API}/admin/services`);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const updateContent = async (section, field, value) => {
    try {
      setLoading(true);
      await axios.put(`${API}/content`, {
        section,
        field,
        content: value
      });
      
      toast({
        title: "Content Updated",
        description: "Changes saved successfully",
      });

      const key = `${section}_${field}`;
      setContent(prev => ({ ...prev, [key]: value }));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleServiceUpdate = async (serviceId, serviceData) => {
    try {
      setLoading(true);
      if (serviceId) {
        await axios.put(`${API}/admin/services/${serviceId}`, serviceData);
        toast({
          title: "Service Updated",
          description: "Service updated successfully",
        });
      } else {
        await axios.post(`${API}/admin/services`, serviceData);
        toast({
          title: "Service Created", 
          description: "New service added successfully",
        });
      }
      
      fetchServices();
      setEditingService(null);
      setNewService({ title: '', description: '', features: [''], active: true, order: 0 });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save service",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    
    try {
      setLoading(true);
      await axios.delete(`${API}/admin/services/${serviceId}`);
      toast({
        title: "Service Deleted",
        description: "Service removed successfully",
      });
      fetchServices();
    } catch (error) {
      toast({
        title: "Error", 
        description: "Failed to delete service",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addFeature = (service, setService) => {
    setService({
      ...service,
      features: [...service.features, '']
    });
  };

  const removeFeature = (service, setService, index) => {
    setService({
      ...service,
      features: service.features.filter((_, i) => i !== index)
    });
  };

  const updateFeature = (service, setService, index, value) => {
    const newFeatures = [...service.features];
    newFeatures[index] = value;
    setService({
      ...service,
      features: newFeatures
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Button 
                onClick={onBack}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Content Manager</h1>
                <p className="text-slate-600">Edit website content and manage services</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Website Content</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Services Management</span>
            </TabsTrigger>
          </TabsList>

          {/* Content Editing Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="h-5 w-5" />
                  <span>Edit Website Text</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contentSections.map((section, index) => {
                  const key = `${section.section}_${section.field}`;
                  const currentValue = content[key] || '';
                  
                  return (
                    <div key={index} className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">
                        {section.label}
                      </label>
                      {section.type === 'textarea' ? (
                        <Textarea
                          value={currentValue}
                          onChange={(e) => setContent(prev => ({ ...prev, [key]: e.target.value }))}
                          placeholder={section.placeholder}
                          rows={3}
                          className="resize-none"
                        />
                      ) : (
                        <Input
                          value={currentValue}
                          onChange={(e) => setContent(prev => ({ ...prev, [key]: e.target.value }))}
                          placeholder={section.placeholder}
                        />
                      )}
                      <Button 
                        onClick={() => updateContent(section.section, section.field, currentValue)}
                        disabled={loading}
                        size="sm"
                        className="mt-2"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save {section.label}
                      </Button>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Management Tab */}
          <TabsContent value="services" className="space-y-6">
            {/* Add New Service */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Add New Service</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Service Title"
                  value={newService.title}
                  onChange={(e) => setNewService({...newService, title: e.target.value})}
                />
                <Textarea
                  placeholder="Service Description"
                  value={newService.description}
                  onChange={(e) => setNewService({...newService, description: e.target.value})}
                  rows={3}
                />
                
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Features</label>
                  {newService.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <Input
                        placeholder="Feature description"
                        value={feature}
                        onChange={(e) => updateFeature(newService, setNewService, index, e.target.value)}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFeature(newService, setNewService, index)}
                        disabled={newService.features.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addFeature(newService, setNewService)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Feature
                  </Button>
                </div>

                <Button 
                  onClick={() => handleServiceUpdate(null, newService)}
                  disabled={loading || !newService.title || !newService.description}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Service
                </Button>
              </CardContent>
            </Card>

            {/* Existing Services */}
            <div className="grid gap-6">
              {services.map((service) => (
                <Card key={service.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{service.title}</span>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingService(service)}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteService(service.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {editingService?.id === service.id ? (
                      <div className="space-y-4">
                        <Input
                          value={editingService.title}
                          onChange={(e) => setEditingService({...editingService, title: e.target.value})}
                        />
                        <Textarea
                          value={editingService.description}
                          onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                          rows={3}
                        />
                        
                        <div>
                          <label className="text-sm font-medium text-slate-700 mb-2 block">Features</label>
                          {editingService.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-2">
                              <Input
                                value={feature}
                                onChange={(e) => updateFeature(editingService, setEditingService, index, e.target.value)}
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeFeature(editingService, setEditingService, index)}
                                disabled={editingService.features.length === 1}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addFeature(editingService, setEditingService)}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Feature
                          </Button>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button 
                            onClick={() => handleServiceUpdate(service.id, editingService)}
                            disabled={loading}
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => setEditingService(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-slate-600 mb-4">{service.description}</p>
                        <div className="space-y-1">
                          {service.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm text-slate-600">
                              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContentEditor;