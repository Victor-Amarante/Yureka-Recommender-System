import logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import LoginModal from '@/features/auth/components/LoginModal';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import SignupFormDemo from '../signup-form-demo';

export default function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0F0F13]/80 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/landing" className="flex items-center space-x-2">
            <img src={logo} alt="logo YuReka" width={200} height={200} />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/features"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Recursos
            </Link>
            <Link
              to="/how-it-works"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Como Funciona
            </Link>
            <Link
              to="/pricing"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Planos
            </Link>
            <Link
              to="/testimonials"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Depoimentos
            </Link>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <LoginModal />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
