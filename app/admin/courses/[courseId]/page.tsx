"use client";

import type React from "react";
import { useState, useEffect } from "react";
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

export default function EditCoursePage({ params }: { params: { courseId: string } }) {
  const router = useRouter();
  const { courseId } = params;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Course>>({});

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const course = await CourseAPI.getCourses(courseId);
        if (course.length > 0) {
          setFormData(course[0]);
        } else {
          toast({
            title: "Course not found",
            description: `No course found with ID: ${courseId}`,
            variant: "destructive",
          });
          router.push("/admin/courses");
        }
      } catch (error) {
        console.error("Failed to fetch course:", error);
        toast({
          title: "Error",
          description: "Failed to fetch course details",
          variant: "destructive",
        });
        router.push("/admin/courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, router]);

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

    if (!formData.title || !formData.slug) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    try {
      await CourseAPI.updateCourse(courseId, {
        ...formData,
        updatedAt: new Date().toISOString().split("T")[0],
      });
      toast({
        title: "Course updated",
        description: "The course has been updated successfully.",
      });
      router.push("/admin/courses");
    } catch (error) {
      console.error("Failed to update course:", error);
      toast({
        title: "Failed to update course",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-pulse text-center">
          <p className="text-muted-foreground">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!formData.courseId) {
    return (
      <div className="flex justify-center p-8">
        <div className="text-center">
          <p className="text-muted-foreground">Course not found</p>
          <Link href="/admin/courses">
            <Button className="mt-4">Back to Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold tracking-tight">Edit Course</h1>
          <p className="text-muted-foreground">Update the details for {formData.title}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Course Information</CardTitle>
            <CardDescription>Edit the information for this course.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="courseId">Course ID</Label>
                <Input id="courseId" name="courseId" value={courseId} disabled />
                <p className="text-xs text-muted-foreground">Course ID cannot be changed.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="slug">
                  Slug <span className="text-red-500">*</span>
                </Label>
                <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} required />
                <p className="text-xs text-muted-foreground">URL-friendly version of the title.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageSrc">Image URL</Label>
                <Input id="imageSrc" name="imageSrc" value={formData.imageSrc} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
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
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}