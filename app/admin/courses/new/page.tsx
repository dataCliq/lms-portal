"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { type Course, CourseAPI } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";

export default function NewCoursePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Course>>({
    courseId: "",
    title: "",
    slug: "",
    imageSrc: "",
    description: "",
    tags: [],
    rating: 0,
    weekCount: 0,
    price: null,
    createdAt: new Date().toISOString().split("T")[0],
    updatedAt: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" || name === "weekCount" ? Number.parseFloat(value) || 0 : value,
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    setFormData((prev) => ({ ...prev, tags: tagsArray }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.courseId || !formData.title || !formData.slug) {
      toast({
        title: "Missing required fields",
        description: "Please fill in course ID, title, and slug.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      await CourseAPI.createCourse(formData as Course);
      toast({
        title: "Course created",
        description: "The course has been created successfully.",
      });
      router.push("/admin/courses");
    } catch (error) {
      console.error("Failed to create course:", error);
      toast({
        title: "Failed to create course",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/admin/courses">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Course</h1>
          <p className="text-muted-foreground">Add a new course to the platform.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Course Information</CardTitle>
            <CardDescription>Enter the information for your new course.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="courseId">
                  Course ID <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="courseId"
                  name="courseId"
                  placeholder="e.g., sql"
                  value={formData.courseId}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-muted-foreground">Unique identifier for the course.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Mastering SQL"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="slug">
                  Slug <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="slug"
                  name="slug"
                  placeholder="e.g., mastering-sql"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-muted-foreground">URL-friendly version of the title.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageSrc">Image URL</Label>
                <Input
                  id="imageSrc"
                  name="imageSrc"
                  placeholder="e.g., https://example.com/image.jpg"
                  value={formData.imageSrc}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the course..."
                value={formData.description}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  name="tags"
                  placeholder="e.g., sql, database, beginner"
                  value={formData.tags?.join(", ")}
                  onChange={handleTagsChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Rating (0-5)</Label>
                <Input
                  id="rating"
                  name="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/admin/courses">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>Creating...</>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Create Course
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}