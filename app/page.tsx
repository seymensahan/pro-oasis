import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, DollarSign, FileText, LineChart, Package, PieChart } from "lucide-react";
import Link from "next/link";
import HomeHeader from "./HomeHeader";


// Type definitions for props
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}



export default function Home() {
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <HomeHeader />

      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Manage Your Stock, Finances, and Taxes in One Place
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Streamline your business operations with our all-in-one management solution
          </p>
          <Link href="/login">
            <Button size="lg" className="text-lg px-8 py-4">Get Started for Free</Button>
          </Link>
        </section>

        <section id="features" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Package className="h-10 w-10 text-blue-600" />}
              title="Stock Management"
              description="Keep track of your inventory in real-time with advanced stock management tools."
            />
            <FeatureCard
              icon={<DollarSign className="h-10 w-10 text-green-600" />}
              title="Financial Management"
              description="Manage your finances with ease, from invoicing to expense tracking and financial reporting."
            />
            <FeatureCard
              icon={<FileText className="h-10 w-10 text-purple-600" />}
              title="Tax Assistance"
              description="Stay compliant with built-in tax calculators and reporting features for easy fiscal management."
            />
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-blue-600 text-white rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-3xl font-bold mb-4">Ready to optimize your business?</h2>
              <p className="text-xl">Join thousands of satisfied customers and take control of your operations today.</p>
            </div>
            <Button size="lg" variant="secondary" className="text-blue-600">
              Start Your Free Trial
            </Button>
          </div>
        </section>

        <section id="pricing" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Flexible Pricing Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              title="Basic"
              price="$29"
              features={[
                "Stock management",
                "Basic financial reports",
                "Email support"
              ]}
            />
            <PricingCard
              title="Pro"
              price="$79"
              features={[
                "Advanced stock management",
                "Comprehensive financial tools",
                "Tax assistance",
                "Priority support"
              ]}
              highlighted={true}
            />
            <PricingCard
              title="Enterprise"
              price="Custom"
              features={[
                "Full suite of features",
                "Customizable solutions",
                "Dedicated account manager",
                "24/7 premium support"
              ]}
            />
          </div>
        </section>

        <section id="contact" className="text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
          <p className="text-xl text-gray-600 mb-8">Our support team is here to assist you</p>
          <Button size="lg">Contact Us</Button>
        </section>
      </main>

      <footer className="bg-gray-100 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <PieChart className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">FinStock Manager</span>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li><Link href="#" className="text-gray-600 hover:text-blue-600">Privacy Policy</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-blue-600">Terms of Service</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-blue-600">FAQ</Link></li>
              </ul>
            </nav>
          </div>
          <div className="mt-4 text-center text-gray-500">
            © 2023 FinStock Manager. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

function PricingCard({ title, price, features, highlighted = false }: PricingCardProps) {
  return (
    <Card className={`flex flex-col ${highlighted ? 'border-blue-500 border-2' : ''}`}>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>
          <span className="text-3xl font-bold">{price}</span>
          {price !== "Custom" && <span className="text-gray-500">/month</span>}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <BarChart3 className="h-5 w-5 text-green-500 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <div className="p-6 mt-auto">
        <Button className="w-full" variant={highlighted ? "default" : "outline"}>
          Choose Plan
        </Button>
      </div>
    </Card>
  );
}
