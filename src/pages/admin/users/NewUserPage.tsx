import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router";
import { userSchema, type UserFormType } from "@/lib/schemas/schemas";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { uploadToImageKit } from "@/lib/uploadToImageKit";

function NewUserPage() {
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      role: "USER",
      avatar: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  });

  const onSubmit = (data: UserFormType) => {
    // Replace with your backend API call
    console.log("Creating user...");
    console.log(data);
  };

  return (
    <div className="py-4">
      <div className="flex items-center mb-6">
        <Button variant="ghost" asChild className="mr-4">
          <Link to="/admin/users">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Users
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Create New User</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  User Information
                </CardTitle>
                <CardDescription>Enter all required details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Name and Username */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <Input {...register("name")} placeholder="Full Name" />
                    {errors.name && (
                      <p className="text-red-500 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Username</Label>
                    <Input {...register("username")} placeholder="Username" />
                    {errors.username && (
                      <p className="text-red-500 text-sm">
                        {errors.username.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email and Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      {...register("email")}
                      placeholder="Email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Password</Label>
                    <Input
                      type="password"
                      {...register("password")}
                      placeholder="Password"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Role */}
                <div>
                  <Label>Role</Label>
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USER">User</SelectItem>
                          <SelectItem value="ADMIN">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.role && (
                    <p className="text-red-500 text-sm">
                      {errors.role.message}
                    </p>
                  )}
                </div>

                {/* Phone and Avatar Upload */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Phone</Label>
                    <Input
                      type="text"
                      {...register("phone")}
                      placeholder="Phone Number"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="avatar-upload-main"
                      className="cursor-pointer"
                    >
                      Upload Avatar
                    </Label>
                    <Input
                      id="avatar-upload-main"
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            setIsUploading(true);
                            const url = await uploadToImageKit(file);
                            setValue("avatar", url);
                          } catch (err) {
                            console.error("Image upload failed:", err);
                          } finally {
                            setIsUploading(false);
                          }
                        }
                      }}
                    />
                    {errors.avatar && (
                      <p className="text-red-500 text-sm">
                        {errors.avatar.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Street</Label>
                    <Input
                      {...register("street")}
                      placeholder="Street address"
                    />
                  </div>
                  <div>
                    <Label>City</Label>
                    <Input {...register("city")} placeholder="City" />
                  </div>
                  <div>
                    <Label>State</Label>
                    <Input {...register("state")} placeholder="State" />
                  </div>
                  <div>
                    <Label>Zip</Label>
                    <Input {...register("zip")} placeholder="Zip Code" />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Country</Label>
                    <Input {...register("country")} placeholder="Country" />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="mt-6 w-full"
                  disabled={isSubmitting || isUploading}
                >
                  {isSubmitting ? "Creating..." : "Create User"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Preview Card */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>User Preview</CardTitle>
                <CardDescription>
                  How this user will appear in the system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={watch("avatar") || "/placeholder.svg"}
                      alt={watch("name") || "User avatar"}
                    />
                    <AvatarFallback className="text-lg">
                      {watch("name")?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <Label
                    htmlFor="avatar-upload-main"
                    className="cursor-pointer"
                  >
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={isUploading}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {isUploading ? "Uploading..." : "Upload Photo"}
                    </Button>
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG up to 2MB
                  </p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div>
                    <p className="font-medium">
                      {watch("name") || "User Name"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {watch("email") || "user@example.com"}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Role:</span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        watch("role") === "ADMIN"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {watch("role") || "User"}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting || isUploading}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Creating..." : "Create User"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    asChild
                  >
                    <Link to="/admin/users">Cancel</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewUserPage;
