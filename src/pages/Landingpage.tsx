import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  Calculator,
  ChartLine,
  Award,
} from "lucide-react";

const LandingPage = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".slide-up").forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const features = [
    {
      icon: <Brain className="w-8 h-8 text-primary" />,
      title: "AI-Powered Learning",
      description:
        "Personalized tutoring adapted to your unique learning style",
    },
    {
      icon: <Calculator className="w-8 h-8 text-primary" />,
      title: "Interactive Practice",
      description: "Engaging exercises with real-time feedback",
    },
    {
      icon: <ChartLine className="w-8 h-8 text-primary" />,
      title: "Progress Tracking",
      description: "Detailed analytics to monitor your improvement",
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Expert Support",
      description:
        "24/7 assistance from our AI tutoring system",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Student",
      text: "Mathwise transformed my understanding of calculus. The personalized approach made all the difference.",
    },
    {
      name: "David Park",
      role: "Parent",
      text: "My daughter's confidence in math has grown tremendously since using Mathwise.",
    },
    {
      name: "Michael Ross",
      role: "Teacher",
      text: "As an educator, I'm impressed by how well Mathwise adapts to each student's needs.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center gradient-bg px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-gray-700 rounded-full text-sm font-medium">
              Welcome to the Future of Learning
            </span>
            <h1 className="hero-text text-gray-900">
              Master Mathematics with
              <br />
              <span className="text-gray-700">AI-Powered Tutoring</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience personalized learning that adapts to your pace and style,
              making mathematics more accessible and engaging than ever before.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <button
                onClick={() => navigate("/auth")}
                className="px-8 py-3 bg-gray-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Start Learning
              </button>
              <button
                onClick={() => navigate("/demo")}
                className="px-8 py-3 bg-white text-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 slide-up">
            <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Features
            </span>
            <h2 className="section-title mt-4 mb-6">Why Choose Mathwise?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform combines cutting-edge technology with proven
              learning methodologies to deliver an unmatched tutoring experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card slide-up"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 slide-up">
            <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Testimonials
            </span>
            <h2 className="section-title mt-4 mb-6">
              What Our Students Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="glass-card p-8 rounded-xl slide-up"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 gradient-bg">
        <div className="max-w-4xl mx-auto text-center slide-up">
          <h2 className="section-title mb-6">
            Ready to Transform Your Math Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have already discovered the power of
            AI-assisted learning with Mathwise.
          </p>
          <button
            onClick={() => navigate("/auth")}
            className="px-8 py-3 bg-gray-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
