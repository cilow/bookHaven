import { Card, CardContent } from "@/components/ui/card";
import coverImage from "../assets/placeholder.svg";
import { Award, BookOpen, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About BookHaven</h1>

        <div className="mb-12 relative rounded-lg overflow-hidden h-[300px] md:h-[400px]">
          <img
            src={coverImage}
            alt="BookHaven store interior"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl leading-relaxed mb-6">
            Founded in 2010, BookHaven has grown from a small corner bookshop to
            one of the most beloved independent bookstores in the country. Our
            mission is to connect readers with books that inspire, educate, and
            entertain.
          </p>

          <p className="mb-6">
            We believe that books have the power to transform lives, open minds,
            and build bridges between different cultures and perspectives.
            That's why we carefully curate our collection to include diverse
            voices and stories from around the world.
          </p>

          <p className="mb-6">
            Our team of passionate bibliophiles is always ready to help you find
            your next great read, whether you're looking for the latest
            bestseller, a classic you've been meaning to read, or something
            completely unexpected that might change your life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Our Values</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <BookOpen className="h-6 w-6 mr-3 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Literacy for All</h3>
                    <p className="text-muted-foreground">
                      We support literacy programs in our community and donate
                      books to schools and libraries.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Users className="h-6 w-6 mr-3 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Community Focus</h3>
                    <p className="text-muted-foreground">
                      We host book clubs, author events, and workshops to bring
                      readers together.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Award className="h-6 w-6 mr-3 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Quality Selection</h3>
                    <p className="text-muted-foreground">
                      We personally read and review books before adding them to
                      our collection.
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Visit Us</h2>
              <div className="mb-4">
                <div className="flex items-start mb-2">
                  <MapPin className="h-5 w-5 mr-2 text-primary mt-0.5" />
                  <div>
                    <p>123 Book Lane</p>
                    <p>Literary District</p>
                    <p>Bookville, BK 12345</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Located in the heart of the Literary District, our store is
                  easily accessible by public transportation and has parking
                  available nearby.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Store Hours</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 8:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 9:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span>11:00 AM - 6:00 PM</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We're always looking for passionate book lovers to join our team. If
            you're interested in working with us, check out our current openings
            or send us your resume.
          </p>
          <Button>View Career Opportunities</Button>
        </div>
      </div>
    </div>
  );
}
