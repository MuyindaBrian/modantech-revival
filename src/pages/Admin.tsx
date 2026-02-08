import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pencil, Trash2, Plus, LogOut, Upload } from 'lucide-react';
import { BlogPost } from '@/hooks/useBlog';

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading, signIn, signOut } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    author: '',
    content: '',
    tags: '',
    image: '',
    published: false,
  });



  const loadPosts = async () => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('date', { ascending: false });
      if (error) throw error;
      setPosts((data || []) as BlogPost[]);
    } catch (error) {
      console.error('Failed to load posts:', error);
    }
  };

  useEffect(() => {
    if (user && isAdmin) {
      loadPosts();
    } else {
      setPosts([]);
    }
  }, [user, isAdmin]);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(false);
    try {
      await signIn(email, password);
    } catch {
      setLoginError(true);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !supabase?.storage) return;

    try {
      const filePath = `blog-images/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from('blog-images').upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data: publicUrlData } = supabase.storage.from('blog-images').getPublicUrl(filePath);
      setFormData({ ...formData, image: publicUrlData.publicUrl || '' });
      setUploadError(false);
    } catch {
      setUploadError(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const postData = {
      title: formData.title,
      slug: formData.slug,
      description: formData.description,
      author: formData.author,
      content: formData.content,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      image: formData.image,
      published: formData.published,
      date: new Date().toISOString(),
    };

    if (!supabase) return;
    setSaveError(false);
    try {
      if (editingPost) {
        await supabase.from('posts').update(postData).eq('id', editingPost.id);
      } else {
        await supabase.from('posts').insert(postData);
      }

      resetForm();
      loadPosts();
    } catch {
      setSaveError(true);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      description: post.description,
      author: post.author,
      content: post.content,
      tags: post.tags.join(', '),
      image: post.image,
      published: post.published,
    });
    setShowForm(true);
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    if (!supabase) return;
    setDeleteError(false);
    try {
      await supabase.from('posts').delete().eq('id', postId);
      loadPosts();
    } catch {
      setDeleteError(true);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      description: '',
      author: '',
      content: '',
      tags: '',
      image: '',
      published: false,
    });
    setEditingPost(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Backend not configured</CardTitle>
            <CardDescription>
              Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment (e.g. .env or hosting provider) to enable the admin panel and blog.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/')}>Back to home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Sign in to manage blog posts</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setLoginError(false); }}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setLoginError(false); }}
                  required
                />
              </div>
              {loginError && <p className="text-sm text-amber-600 dark:text-amber-400">Invalid credentials. Try again.</p>}
              <Button type="submit" className="w-full">Sign In</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Unauthorized</CardTitle>
            <CardDescription>You do not have permission to access the admin panel.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/')}>Back to home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Blog CMS</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="new">New Post</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">All Posts</h2>
              <Button onClick={() => { resetForm(); setShowForm(true); setDeleteError(false); }}>
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </div>
            {deleteError && <p className="text-sm text-amber-600 dark:text-amber-400">Delete failed. Try again.</p>}
            <div className="grid gap-4">
              {posts.map(post => (
                <Card key={post.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{post.title}</h3>
                          <Badge variant={post.published ? 'default' : 'secondary'}>
                            {post.published ? 'Published' : 'Draft'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{post.description}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {post.tags.map(tag => (
                            <Badge key={tag} variant="outline">{tag}</Badge>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          By {post.author} • {new Date(post.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleEdit(post)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDelete(post.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new">
            <Card>
              <CardHeader>
                <CardTitle>{editingPost ? 'Edit Post' : 'Create New Post'}</CardTitle>
                <CardDescription>Fill in the details to {editingPost ? 'update' : 'create'} a blog post</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="url-friendly-slug"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="Technology, AI, Web Development"
                    />
                  </div>

                  <div>
                    <Label htmlFor="image">Featured Image</Label>
                    <div className="flex gap-2">
                      <Input
                        id="image"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="Image URL or upload below"
                      />
                      <Button type="button" variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    {formData.image && (
                      <img src={formData.image} alt="Preview" className="mt-2 h-32 object-cover rounded" />
                    )}
                    {uploadError && <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">Image upload failed. Try again.</p>}
                  </div>

                  <div>
                    <Label htmlFor="content">Content (Markdown)</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={15}
                      className="font-mono text-sm"
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="published"
                      checked={formData.published}
                      onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                    />
                    <Label htmlFor="published">Published</Label>
                  </div>

                  {saveError && <p className="text-sm text-amber-600 dark:text-amber-400">Save failed. Try again.</p>}
                  <div className="flex gap-2">
                    <Button type="submit">{editingPost ? 'Update' : 'Create'} Post</Button>
                    {editingPost && (
                      <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
