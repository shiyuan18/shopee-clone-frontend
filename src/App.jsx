import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Search, 
  User, 
  Store, 
  Sparkles, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Star, 
  TrendingUp, 
  Package, 
  DollarSign, 
  ShoppingBag as CartIcon, 
  X, 
  ArrowLeft,
  ChevronRight,
  Filter,
  RefreshCw,
  Image as ImageIcon,
  Edit3,
  Lock,
  Mail,
  ShieldCheck,
  FileText,
  AlertCircle,
  UserCheck,
  CreditCard,
  Truck,
  Clock,
  Wallet,
  Landmark,
  Calendar
} from 'lucide-react';

// Starting Mock Data for Products
const INITIAL_PRODUCTS = [
  {
    id: 'p1',
    name: "HyperX Cloud II Pro Gaming Headset - Red",
    price: 349,
    originalPrice: 499,
    category: "Electronics",
    rating: 4.8,
    sales: 1200,
    stock: 45,
    seller: "HyperX Official Store",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=500&q=80",
    description: "Experience virtual 7.1 surround sound and premium noise-canceling microphone for immersive gaming sessions."
  },
  {
    id: 'p2',
    name: "Korean Minimalist Oversized Blazer Outfit",
    price: 49,
    originalPrice: 99,
    category: "Fashion",
    rating: 4.6,
    sales: 3400,
    stock: 120,
    seller: "Seoul Threads Co.",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=80",
    description: "Premium cotton-poly blend oversized blazer perfect for casual office wear or streetwear styles."
  },
  {
    id: 'p3',
    name: "Ultra-Hydrating Hyaluronic Acid Serum 50ml",
    price: 39,
    originalPrice: 75,
    category: "Beauty",
    rating: 4.9,
    sales: 5200,
    stock: 8,
    seller: "GlowUp Labs",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80",
    description: "Locks in skin moisture instantly. Free of parabens, artificial fragrance, and animal testing."
  },
  {
    id: 'p4',
    name: "Modern Ergonomic Office Chair with Lumbar Support",
    price: 289,
    originalPrice: 599,
    category: "Home & Living",
    rating: 4.7,
    sales: 450,
    stock: 12,
    seller: "Comfort Furniture",
    image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=500&q=80",
    description: "Adjustable 3D armrests, dynamic lumbar-support mesh back, and steel reinforcement."
  },
  {
    id: 'p5',
    name: "Wireless Mechanical Keyboard RGB Hot-Swappable",
    price: 189,
    originalPrice: 299,
    category: "Electronics",
    rating: 4.9,
    sales: 850,
    stock: 15,
    seller: "KeebCrafter",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=80",
    description: "Compact 75% layout, Gateron brown switches, dual mode bluetooth / wired connection."
  },
  {
    id: 'p6',
    name: "Air Fryer XL 5.5L Digital Touchscreen",
    price: 159,
    originalPrice: 320,
    category: "Home & Living",
    rating: 4.5,
    sales: 2100,
    stock: 22,
    seller: "KitchenWiz Store",
    image: "https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?auto=format&fit=crop&w=500&q=80",
    description: "Cook with up to 85% less oil. Built-in touch panel with 8 pre-programmed food settings."
  }
];

export default function App() {
  // Global States
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [currentTab, setCurrentTab] = useState('buyer'); // 'buyer' or 'seller'
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Modals & Details
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [myOrders, setMyOrders] = useState([]);

  // Authentication & Users State
  const [currentUser, setCurrentUser] = useState(null); // null means Guest/Unauthenticated
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  
  // Auth Form Fields
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authRole, setAuthRole] = useState('buyer'); // 'buyer' | 'seller'
  const [authStoreName, setAuthStoreName] = useState('');

  // Seller Verification Progress Fields
  const [sellerIdNumber, setSellerIdNumber] = useState('');
  const [sellerBusinessType, setSellerBusinessType] = useState('Individual / Sole Proprietorship');
  const [sellerDocumentFile, setSellerDocumentFile] = useState('');
  const [isSubmittingVerification, setIsSubmittingVerification] = useState(false);

  // New Product Listing Form (Seller Mode)
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('Electronics');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdOriginalPrice, setNewProdOriginalPrice] = useState('');
  const [newProdStock, setNewProdStock] = useState('');
  const [newProdDescription, setNewProdDescription] = useState('');
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80');

  // AI & Gemini States
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [aiError, setAiError] = useState('');

  // Seller Dashboard Metrics & Profit Sharing
  const PLATFORM_FEE_PERCENTAGE = 0.05; // 5% Shopee Commission
  const [sellerStats, setSellerStats] = useState({
    grossRevenue: 0,
    platformFees: 0,
    netProfit: 0,
    pendingSettlement: 0,
    ordersCompleted: 0,
    views: 142,
    lowStockCount: 0
  });

  // Countdown timer for simulated Flash Sale
  const [countdown, setCountdown] = useState({ hrs: 1, mins: 12, secs: 49 });
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { hrs: prev.hrs, mins: prev.mins - 1, secs: 59 };
        if (prev.hrs > 0) return { hrs: prev.hrs - 1, mins: 59, secs: 59 };
        return { hrs: 0, mins: 0, secs: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update Low Stock Indicator whenever products modify
  useEffect(() => {
    const lowStock = products.filter(p => p.stock < 10).length;
    setSellerStats(prev => ({ ...prev, lowStockCount: lowStock }));
  }, [products]);

  // Shopping Actions with Auth Safeguards
  const addToCart = (product) => {
    if (!currentUser) {
      alertToast("🔒 You must sign in to add products to your cart.");
      setAuthMode('login');
      setShowAuthModal(true);
      return;
    }

    if (product.stock <= 0) {
      alertToast("Sorry, this item is out of stock!");
      return;
    }
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) {
          alertToast(`Only ${product.stock} units are left in stock!`);
          return prev;
        }
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    alertToast(`${product.name.slice(0, 20)}... added to shopping cart!`);
  };

  const updateCartQuantity = (id, change) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + change;
          const originalProd = products.find(p => p.id === id);
          if (newQty <= 0) return null;
          if (originalProd && newQty > originalProd.stock) {
            alertToast("Maximum stock limit reached.");
            return item;
          }
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleProceedToPayment = () => {
    if (!currentUser) {
      alertToast("🔒 Please login to proceed with checkout.");
      setAuthMode('login');
      setShowAuthModal(true);
      return;
    }
    if (cart.length === 0) return;
    
    setShowCart(false);
    setShowPaymentGateway(true);
  };

  const handleProcessPayment = (e) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    
    // Simulate API processing delay
    setTimeout(() => {
      // Deduct stock levels in simulated database
      setProducts(prev => {
        return prev.map(p => {
          const cartItem = cart.find(c => c.id === p.id);
          if (cartItem) {
            return { ...p, stock: Math.max(0, p.stock - cartItem.quantity) };
          }
          return p;
        });
      });

      // Calculate Revenue Sharing (Platform fee vs Seller Profit)
      const totalOrderValue = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      const feeAmount = totalOrderValue * PLATFORM_FEE_PERCENTAGE;
      const netAmount = totalOrderValue - feeAmount;

      // Add to simulated seller stats
      setSellerStats(prev => ({
        ...prev,
        grossRevenue: prev.grossRevenue + totalOrderValue,
        platformFees: prev.platformFees + feeAmount,
        netProfit: prev.netProfit + netAmount,
        pendingSettlement: prev.pendingSettlement + netAmount,
        ordersCompleted: prev.ordersCompleted + 1
      }));

      // Create new order for logistics tracking
      const newOrder = {
        id: `ORD-${Math.floor(Math.random() * 1000000)}`,
        items: [...cart],
        total: totalOrderValue,
        status: 'Processing', // 'Processing', 'Shipped', 'Delivered'
        date: new Date().toLocaleDateString(),
        estimatedArrival: new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)).toLocaleDateString() // +3 days
      };
      setMyOrders(prev => [newOrder, ...prev]);

      setCart([]);
      setIsProcessingPayment(false);
      setShowPaymentGateway(false);
      setCheckoutSuccess(true);
    }, 2000);
  };

  // Toast / Status banner helpers (No standard browser alerts as per instructions)
  const [toastMsg, setToastMsg] = useState(null);
  const alertToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
    }, 3000);
  };

  // Auth Submit Action
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      alertToast("Please fill in all credentials.");
      return;
    }

    if (authMode === 'register') {
      if (!authName) {
        alertToast("Please enter your name.");
        return;
      }
      if (authRole === 'seller' && !authStoreName) {
        alertToast("Sellers must choose a unique Store Name!");
        return;
      }

      // Create simulated account state
      const newUser = {
        name: authName,
        email: authEmail,
        role: authRole,
        storeName: authRole === 'seller' ? authStoreName : '',
        isVerified: false, // Must verify identity to list products
        verificationPending: false
      };
      
      setCurrentUser(newUser);
      alertToast(`🎉 Welcome to Shopee Clone, ${authName}!`);
      setShowAuthModal(false);
    } else {
      // Mock Login
      const existingUser = {
        name: authEmail.split('@')[0],
        email: authEmail,
        role: authEmail.includes('seller') ? 'seller' : 'buyer',
        storeName: authEmail.includes('seller') ? "Supreme Electro Store" : "",
        isVerified: authEmail.includes('verify') ? true : false,
        verificationPending: false
      };
      setCurrentUser(existingUser);
      alertToast(`👋 Welcome back, ${existingUser.name}!`);
      setShowAuthModal(false);
    }
  };

  // Simulated Merchant identity verification submit
  const handleVerifyIdentity = (e) => {
    e.preventDefault();
    if (!sellerIdNumber || !sellerDocumentFile) {
      alertToast("Please upload the documents and enter an ID/Business number!");
      return;
    }

    setIsSubmittingVerification(true);
    alertToast("⏳ Uploading verification materials to Shopee Registry...");

    setTimeout(() => {
      setCurrentUser(prev => ({
        ...prev,
        verificationPending: true
      }));
      setIsSubmittingVerification(false);
      alertToast("📄 Documents uploaded! Shopee Admins are reviewing your business.");
    }, 1500);
  };

  // Sandbox bypass to verify seller immediately for testing
  const instantApproveSeller = () => {
    setCurrentUser(prev => ({
      ...prev,
      isVerified: true,
      verificationPending: false
    }));
    alertToast("🛡️ Sandbox Admin Bypass: Seller status successfully VERIFIED!");
  };

  // Helper function: exponential backoff for Gemini APIs (Up to 5 times)
  const callGeminiWithBackoff = async (apiCallFn) => {
    let delay = 1000;
    for (let i = 0; i < 5; i++) {
      try {
        return await apiCallFn();
      } catch (err) {
        if (i === 4) throw err;
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
      }
    }
  };

  // Gemini API - Generate Creative Product Copywriting
  const generateAIDescription = async () => {
    if (!aiPrompt) {
      alertToast("Please enter a few keywords or product features first!");
      return;
    }
    setIsGeneratingDesc(true);
    setAiError('');

    const apiKey = ""; // API Key injected at runtime
    const systemInstruction = "You are a top-selling Shopee product description copywriter. Write a highly converting, SEO-optimized, friendly product description with attractive bullet points and relevant eye-catching emojis. Do not sound too formal, use local e-commerce slang (e.g. 'Ready Stock!', 'Hot Selling!', 'Premium Quality'). Keep it short and impactful.";
    const userQuery = `Write a description for this product name: ${newProdName || "Exciting Product"}. Additional details/keywords: ${aiPrompt}`;

    const apiCall = async () => {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userQuery }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] }
        })
      });
      if (!response.ok) throw new Error("API Connection Error");
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text;
    };

    try {
      const resultText = await callGeminiWithBackoff(apiCall);
      if (resultText) {
        setNewProdDescription(resultText);
        alertToast("✨ Product description generated successfully!");
      } else {
        throw new Error("No response received.");
      }
    } catch (err) {
      console.error(err);
      setAiError("Unable to reach Gemini right now. Let's use a nice template description!");
      // Fallback description template if API key / service fails
      setNewProdDescription(
        `🔥 [READY STOCK IN MALAYSIA] 🔥\n\n` +
        `Introduce the newly upgraded ${newProdName || "New Product"}!\n` +
        `⭐ High Quality & Premium Material\n` +
        `⭐ Fast Shipping (Post out within 24 Hours)\n` +
        `⭐ Super Affordable & Practical Price\n\n` +
        `Specifications:\n` +
        `- Category: ${newProdCategory}\n` +
        `- Key Features: High utility, long durability, premium build quality.\n\n` +
        `👉 Claim shop vouchers before checking out! Limited stock available. Grab yours now!`
      );
    } finally {
      setIsGeneratingDesc(false);
    }
  };

  // Gemini API (Imagen 4) - Generate Simulated Cover Image for Product
  const generateAIImage = async () => {
    if (!imagePrompt) {
      alertToast("Please enter what your product image should look like!");
      return;
    }
    setIsGeneratingImage(true);
    const apiKey = "";

    const apiCall = async () => {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instances: { prompt: `${imagePrompt}, ultra-high quality, e-commerce white background studio lighting shot, premium product styling` },
          parameters: { sampleCount: 1 }
        })
      });
      if (!response.ok) throw new Error("Imagen generation failed");
      const data = await response.json();
      return `data:image/png;base64,${data.predictions[0].bytesBase64Encoded}`;
    };

    try {
      const base64Url = await callGeminiWithBackoff(apiCall);
      setNewProdImage(base64Url);
      alertToast("🎨 Cover image generated beautifully!");
    } catch (err) {
      console.error(err);
      // Fallback simulated premium visual from Unsplash keywords
      const fallbackUrl = `https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80`;
      setNewProdImage(fallbackUrl);
      alertToast("🎨 Added sample cover photo (Using fallback mockup)");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Handle Form Submission for Adding a Product
  const handleAddNewProduct = (e) => {
    e.preventDefault();
    if (!currentUser || !currentUser.isVerified) {
      alertToast("🔒 Verified Seller identity required to publish items.");
      return;
    }

    if (!newProdName || !newProdPrice || !newProdStock) {
      alertToast("Please fill out product name, price, and stock levels.");
      return;
    }

    const createdProduct = {
      id: `p-${Date.now()}`,
      name: newProdName,
      price: parseFloat(newProdPrice),
      originalPrice: newProdOriginalPrice ? parseFloat(newProdOriginalPrice) : parseFloat(newProdPrice) * 1.5,
      category: newProdCategory,
      rating: 5.0,
      sales: 0,
      stock: parseInt(newProdStock),
      seller: currentUser.storeName || "Premium Authorized Merchant",
      image: newProdImage,
      description: newProdDescription || "No detailed description provided."
    };

    setProducts(prev => [createdProduct, ...prev]);
    alertToast("🎉 Your product is live on Shopee Clone Storefront!");
    
    // Clear Form Fields
    setNewProdName('');
    setNewProdPrice('');
    setNewProdOriginalPrice('');
    setNewProdStock('');
    setNewProdDescription('');
    setAiPrompt('');
    setImagePrompt('');
    setNewProdImage('https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80');
  };

  // Filters calculation
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate Total Cart Cost
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800 antialiased">
      
      {/* Toast Alert Banner */}
      {toastMsg && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-gray-900 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-orange-500 transition-all animate-bounce">
          <span className="w-2 h-2 rounded-full bg-orange-500"></span>
          <span className="text-sm font-medium">{toastMsg}</span>
        </div>
      )}

      {/* Shopee Style Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#f53d2d] text-white shadow-md">
        {/* Upper Top Navbar Mini info */}
        <div className="bg-[#d0011b] text-xs py-1.5 px-4 md:px-8 flex justify-between items-center font-light">
          <div className="flex gap-4">
            <span className="hover:underline cursor-pointer" onClick={() => setCurrentTab('seller')}>Seller Centre</span>
            <span className="hover:underline cursor-pointer">Download</span>
            <span className="hover:underline cursor-pointer">Follow us on social</span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="hover:underline cursor-pointer flex items-center gap-1">
              🔔 Notifications
            </span>
            <span className="hover:underline cursor-pointer">Help Centre</span>
            {currentUser ? (
              <div className="flex items-center gap-2">
                <span className="text-yellow-300 font-bold bg-red-800/60 px-2 py-0.5 rounded text-[11px]">
                  {currentUser.role === 'seller' ? 'Seller Hub' : 'Buyer'}
                </span>
                <span className="font-semibold text-xs text-white">{currentUser.name}</span>
                <button 
                  onClick={() => {
                    setCurrentUser(null);
                    setCart([]);
                    alertToast("Logged out successfully.");
                  }} 
                  className="text-[10px] text-red-200 underline hover:text-white"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  setAuthMode('login');
                  setShowAuthModal(true);
                }} 
                className="font-semibold hover:underline flex items-center gap-1"
              >
                <User className="w-3.5 h-3.5" />
                Login / Register
              </button>
            )}
          </div>
        </div>

        {/* Main Header Search & Brand Bar */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Logo / Brand */}
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setCurrentTab('buyer')}>
              <div className="bg-white text-[#f53d2d] p-1.5 rounded-lg font-black text-2xl tracking-tighter">S</div>
              <h1 className="text-2xl font-bold tracking-wide">
                shopee<span className="text-yellow-300 font-extrabold text-sm ml-1 px-1.5 py-0.5 bg-red-800 rounded">CLONE</span>
              </h1>
            </div>

            {/* Quick Tab Switch (Mobile Toggle Button) */}
            <div className="flex md:hidden gap-2">
              <button 
                onClick={() => setCurrentTab(currentTab === 'buyer' ? 'seller' : 'buyer')}
                className="bg-orange-800 px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1"
              >
                {currentTab === 'buyer' ? <Store className="w-3 h-3" /> : <ShoppingBag className="w-3 h-3" />}
                {currentTab === 'buyer' ? 'Seller Centre' : 'Buyer Mall'}
              </button>
            </div>
          </div>

          {/* Shopee Search Box */}
          <div className="w-full md:flex-1 md:max-w-2xl relative">
            <div className="flex bg-white rounded-md shadow p-1">
              <input 
                type="text" 
                placeholder="Search products, brands, smart items..."
                className="w-full pl-3 pr-2 py-2 text-gray-800 focus:outline-none text-sm rounded-l-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-[#f53d2d] text-white px-6 py-2 rounded-md hover:bg-[#d0011b] transition flex items-center gap-1">
                <Search className="w-4 h-4" />
              </button>
            </div>
            {/* Quick tags */}
            <div className="hidden md:flex gap-3 text-xs mt-1.5 font-light text-red-100">
              <span className="cursor-pointer hover:text-yellow-200" onClick={() => setSearchQuery('Keyboard')}>Keyboard</span>
              <span className="cursor-pointer hover:text-yellow-200" onClick={() => setSearchQuery('Korean Outfit')}>Korean Outfit</span>
              <span className="cursor-pointer hover:text-yellow-200" onClick={() => setSearchQuery('Serum')}>Serum</span>
              <span className="cursor-pointer hover:text-yellow-200" onClick={() => setSearchQuery('Office')}>Office Chair</span>
              <span className="cursor-pointer hover:text-yellow-200" onClick={() => setSearchQuery('Air Fryer')}>Air Fryer</span>
            </div>
          </div>

          {/* Desktop Tab Switchers and Cart */}
          <div className="hidden md:flex items-center gap-6">
            {/* Tab Controllers */}
            <div className="flex bg-orange-800/40 p-1 rounded-full border border-orange-400/30">
              <button 
                onClick={() => setCurrentTab('buyer')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition ${currentTab === 'buyer' ? 'bg-white text-[#f53d2d] shadow' : 'text-white hover:bg-orange-800/30'}`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Buyer Mall
              </button>
              <button 
                onClick={() => setCurrentTab('seller')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition ${currentTab === 'seller' ? 'bg-white text-[#f53d2d] shadow' : 'text-white hover:bg-orange-800/30'}`}
              >
                <Store className="w-3.5 h-3.5" />
                Seller Centre
              </button>
            </div>

            {/* Shopee Cart Badge */}
            <div className="flex items-center gap-5">
              {currentUser && currentUser.role !== 'seller' && (
                <button 
                  onClick={() => setShowOrdersModal(true)}
                  className="hidden md:flex items-center gap-1.5 text-white hover:text-yellow-200 transition text-xs font-semibold"
                >
                  <Truck className="w-5 h-5" />
                  My Purchases
                </button>
              )}
              <div 
                className="relative cursor-pointer hover:scale-105 transition"
                onClick={() => setShowCart(true)}
              >
                <CartIcon className="w-7 h-7 text-white" />
                {cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-yellow-400 text-[#d0011b] font-bold text-xs rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#f53d2d]">
                    {cart.reduce((sum, i) => sum + i.quantity, 0)}
                  </span>
                )}
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-6">

        {/* ========================================================= */}
        {/* BUYER MODE VIEW */}
        {/* ========================================================= */}
        {currentTab === 'buyer' && (
          <div>
            {/* Banner Carousel Simulated */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="md:col-span-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-6 text-white relative overflow-hidden h-48 flex flex-col justify-between shadow-sm">
                <div>
                  <span className="bg-yellow-400 text-red-950 text-xs font-black uppercase px-2 py-1 rounded">7.7 Mega Campaign</span>
                  <h2 className="text-3xl font-extrabold mt-2 leading-tight">FREE SHIPPING MIN. SPEND RM0!</h2>
                  <p className="text-orange-100 text-sm mt-1">Claim discount vouchers up to 90% off coins cashback daily.</p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-white text-red-600 font-bold px-4 py-1.5 rounded text-xs shadow hover:bg-orange-50 transition">Shop Campaign</button>
                  <button className="bg-transparent border border-white hover:bg-white/10 text-white font-bold px-4 py-1.5 rounded text-xs transition">Claim Vouchers</button>
                </div>
                {/* Decorative circle */}
                <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-yellow-300/20 rounded-full blur-xl"></div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="bg-amber-100 rounded-lg p-4 flex-1 flex items-center justify-between border border-amber-200">
                  <div>
                    <h4 className="text-amber-800 font-bold text-sm">SPIN & WIN COINS</h4>
                    <p className="text-xs text-amber-700">Win up to 50,000 extra coins</p>
                  </div>
                  <div className="text-3xl">🪙</div>
                </div>
                <div className="bg-rose-100 rounded-lg p-4 flex-1 flex items-center justify-between border border-rose-200">
                  <div>
                    <h4 className="text-rose-800 font-bold text-sm">SPAYLATER READY</h4>
                    <p className="text-xs text-rose-700">Buy now pay later 0% interest</p>
                  </div>
                  <div className="text-3xl">💳</div>
                </div>
              </div>
            </div>

            {/* Flash Sale Banner */}
            <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-orange-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h3 className="text-[#f53d2d] font-black text-xl italic tracking-wider flex items-center gap-1">
                  ⚡ FLASH SALE
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="bg-gray-900 text-white font-bold text-xs px-2 py-1 rounded">{String(countdown.hrs).padStart(2, '0')}</span>
                  <span className="text-gray-900 font-bold">:</span>
                  <span className="bg-gray-900 text-white font-bold text-xs px-2 py-1 rounded">{String(countdown.mins).padStart(2, '0')}</span>
                  <span className="text-gray-900 font-bold">:</span>
                  <span className="bg-gray-900 text-white font-bold text-xs px-2 py-1 rounded">{String(countdown.secs).padStart(2, '0')}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Super low rates, refresh guaranteed</span>
                <span className="text-xs text-orange-600 font-semibold flex items-center">View All <ChevronRight className="w-3.5 h-3.5" /></span>
              </div>
            </div>

            {/* Interactive Search Category Pills */}
            <div className="mb-6 overflow-x-auto pb-2 flex gap-2">
              {['All', 'Electronics', 'Fashion', 'Beauty', 'Home & Living'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border whitespace-nowrap transition ${selectedCategory === cat ? 'bg-[#f53d2d] border-[#f53d2d] text-white shadow' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Listing Grid */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-1.5">
                  <Filter className="w-4 h-4 text-[#f53d2d]" />
                  {selectedCategory === 'All' ? 'DAILY DISCOVERY' : `${selectedCategory.toUpperCase()} COLLECTION`}
                </h3>
                <span className="text-xs text-gray-500 font-light">{filteredProducts.length} items found</span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-lg p-12 text-center border border-gray-100">
                  <div className="text-5xl mb-3">🔍</div>
                  <h4 className="font-bold text-gray-700">No matching items found</h4>
                  <p className="text-gray-500 text-xs mt-1">Try changing your search filter tags or category!</p>
                  <button 
                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                    className="mt-4 bg-[#f53d2d] text-white font-semibold text-xs px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
                  {filteredProducts.map(product => {
                    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
                    return (
                      <div 
                        key={product.id} 
                        className="bg-white rounded border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition duration-200 cursor-pointer flex flex-col justify-between overflow-hidden relative group"
                        onClick={() => setSelectedProduct(product)}
                      >
                        {/* Promo / Discount Badge */}
                        {discount > 0 && (
                          <div className="absolute top-0 right-0 bg-[#ffd13f] text-[#f53d2d] text-[10px] font-black px-1.5 py-1 z-10 rounded-bl flex flex-col items-center">
                            <span>{discount}%</span>
                            <span className="text-[8px] uppercase tracking-wider font-semibold">OFF</span>
                          </div>
                        )}

                        {/* Product Image Cover */}
                        <div className="aspect-square bg-gray-100 relative overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80";
                            }}
                          />
                          {product.stock <= 5 && product.stock > 0 && (
                            <span className="absolute bottom-1 left-1 bg-red-600 text-white text-[9px] px-1 py-0.5 rounded font-semibold">
                              Selling Fast
                            </span>
                          )}
                          {product.stock === 0 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <span className="text-white text-xs font-bold bg-red-700 px-2 py-1 rounded">SOLD OUT</span>
                            </div>
                          )}
                        </div>

                        {/* Meta content */}
                        <div className="p-2.5 flex-1 flex flex-col justify-between">
                          <div>
                            {/* Product Name */}
                            <h4 className="text-xs text-gray-800 line-clamp-2 leading-tight mb-1 font-medium group-hover:text-[#f53d2d] transition">
                              {product.name}
                            </h4>

                            {/* Tags or Category */}
                            <div className="flex gap-1 items-center mb-2">
                              <span className="text-[9px] bg-orange-50 text-[#f53d2d] px-1.5 py-0.5 rounded border border-orange-100 font-medium">
                                {product.category}
                              </span>
                              <span className="text-[9px] text-gray-400 font-light truncate">
                                By {product.seller}
                              </span>
                            </div>
                          </div>

                          {/* Price & Rating Row */}
                          <div>
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-sm font-bold text-[#f53d2d]">RM</span>
                              <span className="text-base font-extrabold text-[#f53d2d]">{product.price}</span>
                              <span className="text-[10px] text-gray-400 line-through">RM{product.originalPrice}</span>
                            </div>

                            {/* Rating and Sales */}
                            <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-gray-50">
                              <div className="flex items-center text-[10px] text-amber-500 font-bold">
                                <Star className="w-2.5 h-2.5 fill-current" />
                                <span className="ml-0.5">{product.rating}</span>
                              </div>
                              <span className="text-[9px] text-gray-500">{product.sales}+ sold</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SELLER CENTRE / PORTAL */}
        {/* ========================================================= */}
        {currentTab === 'seller' && (
          <div>
            {/* If Not Logged In */}
            {!currentUser && (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center max-w-xl mx-auto shadow-sm my-12">
                <div className="w-16 h-16 bg-red-100 text-[#f53d2d] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Shopee Seller Centre Gateway</h3>
                <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                  Only registered, identity-verified merchants can build storefronts, list inventory, and review incoming orders.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <button 
                    onClick={() => {
                      setAuthMode('login');
                      setShowAuthModal(true);
                    }}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm px-6 py-2.5 rounded-lg transition"
                  >
                    Log In
                  </button>
                  <button 
                    onClick={() => {
                      setAuthRole('seller');
                      setAuthMode('register');
                      setShowAuthModal(true);
                    }}
                    className="bg-[#f53d2d] hover:bg-red-600 text-white font-bold text-sm px-6 py-2.5 rounded-lg shadow-md transition"
                  >
                    Register as Seller
                  </button>
                </div>
              </div>
            )}

            {/* If Logged In but Registered as a Buyer instead of Seller */}
            {currentUser && currentUser.role !== 'seller' && (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center max-w-xl mx-auto shadow-sm my-12">
                <div className="w-16 h-16 bg-orange-100 text-[#f53d2d] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Store className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Upgrade to Seller Account</h3>
                <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                  You are currently logged in as a Buyer ({currentUser.email}). Upgrade your account status today to build your own shop and start listing products!
                </p>

                <div className="mt-6 p-4 bg-orange-50 rounded-lg text-left border border-orange-100">
                  <label className="block text-xs font-bold text-orange-800 uppercase mb-1">Set Your Store Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. GizmoGlow Official Shop"
                    className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-orange-500 bg-white"
                    value={authStoreName}
                    onChange={(e) => setAuthStoreName(e.target.value)}
                  />
                </div>

                <div className="mt-6 flex justify-center gap-3">
                  <button 
                    onClick={() => {
                      if (!authStoreName) {
                        alertToast("Please choose a Store Name first!");
                        return;
                      }
                      setCurrentUser(prev => ({
                        ...prev,
                        role: 'seller',
                        storeName: authStoreName,
                        isVerified: false
                      }));
                      alertToast("🎉 Role updated! Next: Verify Identity to unlock selling privileges.");
                    }}
                    className="bg-[#f53d2d] hover:bg-red-600 text-white font-bold text-sm px-6 py-3 rounded-lg shadow-md transition w-full"
                  >
                    Accept & Begin Seller Onboarding
                  </button>
                </div>
              </div>
            )}

            {/* If Logged In as Seller, but Identity verification is NOT complete */}
            {currentUser && currentUser.role === 'seller' && !currentUser.isVerified && (
              <div className="max-w-3xl mx-auto my-6">
                
                {/* Pending review message */}
                {currentUser.verificationPending ? (
                  <div className="bg-white rounded-xl border border-blue-200 p-8 shadow-sm text-center">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <RefreshCw className="w-8 h-8 animate-spin" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Merchant Identity Verification Pending</h3>
                    <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                      Thank you for submitting your documentation! Shopee Security Team is currently reviewing your application. Average processing time: 1-2 business days.
                    </p>

                    <div className="mt-8 pt-6 border-t border-gray-100 max-w-md mx-auto">
                      <p className="text-xs text-amber-600 bg-amber-50 rounded-lg p-3 border border-amber-200 flex items-center gap-2 justify-center">
                        <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                        <strong>Testing Mode:</strong> Skip review process to test full listing tools right away!
                      </p>
                      <button 
                        type="button"
                        onClick={instantApproveSeller}
                        className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow transition"
                      >
                        ⚡ Sandbox Bypass: Instant Approve Shop
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Form to enter details */
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    {/* Banner header */}
                    <div className="bg-gradient-to-r from-red-600 to-[#f53d2d] p-6 text-white flex items-center gap-4">
                      <ShieldCheck className="w-12 h-12" />
                      <div>
                        <h2 className="text-lg font-black">Merchant Identity Verification</h2>
                        <p className="text-xs text-red-100 mt-0.5">Complete this registration process to secure your store against Shopee Trust & Safety guidelines.</p>
                      </div>
                    </div>

                    <form onSubmit={handleVerifyIdentity} className="p-6 space-y-6">
                      
                      {/* Store detail summary */}
                      <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between border border-gray-100">
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Registered Store name</span>
                          <h4 className="font-bold text-sm text-gray-800">{currentUser.storeName || "My Beautiful Store"}</h4>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-orange-600 font-bold bg-orange-50 px-3 py-1 rounded border border-orange-100">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Verification Required</span>
                        </div>
                      </div>

                      {/* Input fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Business Entity Type</label>
                          <select 
                            className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-orange-500 bg-white"
                            value={sellerBusinessType}
                            onChange={(e) => setSellerBusinessType(e.target.value)}
                          >
                            <option>Individual / Sole Proprietorship</option>
                            <option>Sdn Bhd / Private Limited Corporate</option>
                            <option>Partnership Merchant</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-600 uppercase mb-1">ID Card or Business Registration No.</label>
                          <input 
                            type="text" 
                            placeholder="e.g. NRIC / ROC Registration Number"
                            className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-orange-500"
                            value={sellerIdNumber}
                            onChange={(e) => setSellerIdNumber(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Simulated File Upload placeholder */}
                      <div>
                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Upload Identification/Verification document (JPG/PDF)</label>
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer transition relative">
                          <input 
                            type="file" 
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => setSellerDocumentFile(e.target.files[0]?.name || "uploaded_id.png")}
                          />
                          <div className="text-3xl text-gray-300 mb-2">📁</div>
                          {sellerDocumentFile ? (
                            <p className="text-sm font-semibold text-emerald-600 flex items-center justify-center gap-1">
                              <CheckCircle className="w-4 h-4" />
                              {sellerDocumentFile}
                            </p>
                          ) : (
                            <div>
                              <p className="text-xs font-bold text-gray-700">Click to attach photo/file</p>
                              <p className="text-[10px] text-gray-400 mt-0.5">Please provide front copy of NRIC ID or official business license</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Declaration */}
                      <div className="p-3 bg-gray-50 rounded border flex gap-2.5 items-start">
                        <input type="checkbox" required className="mt-0.5" />
                        <p className="text-[11px] text-gray-500 leading-normal">I declare that all submitted identity credentials belong to me and represent a valid merchant entity. I agree to comply with Shopee's merchant code of conduct.</p>
                      </div>

                      {/* Submit & Bypass buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button 
                          type="submit"
                          disabled={isSubmittingVerification}
                          className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm py-3 rounded-lg transition shadow-md flex items-center justify-center gap-2"
                        >
                          {isSubmittingVerification ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              Submitting Docs...
                            </>
                          ) : (
                            <>
                              <FileText className="w-4 h-4" />
                              Submit Documentation
                            </>
                          )}
                        </button>
                        
                        <button 
                          type="button"
                          onClick={instantApproveSeller}
                          className="sm:w-auto px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 rounded-lg transition shadow-md flex items-center justify-center gap-1.5"
                        >
                          <UserCheck className="w-4 h-4" />
                          Simulate Instant Admin Bypass
                        </button>
                      </div>

                    </form>
                  </div>
                )}

              </div>
            )}

            {/* If Logged In as Seller AND Verified -> Full Portal Unlock */}
            {currentUser && currentUser.role === 'seller' && currentUser.isVerified && (
              <div>
                {/* Seller Header Summary */}
                <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-[#e03d2b] text-white p-6 rounded-lg mb-6 shadow-md">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Store className="w-5 h-5 text-orange-400" />
                        <span className="text-xs font-bold uppercase tracking-widest text-orange-400">Verified Seller Hub</span>
                      </div>
                      <h2 className="text-2xl font-black mt-1">Storefront: {currentUser.storeName}</h2>
                      <p className="text-xs text-gray-300 mt-1">Manage listings, optimize pricing & use Google Gemini to automatically write high-converting copy!</p>
                    </div>
                    <div className="flex bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-500/40 text-xs items-center gap-2.5 text-emerald-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold">Identity Verified Merchant</span>
                  </div>
                </div>

                {/* Stats Counters */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-6 border-t border-white/10 text-center md:text-left">
                  <div className="bg-white/5 p-3 rounded-md border border-white/5">
                    <div className="flex items-center gap-1.5 text-gray-400 justify-center md:justify-start">
                      <DollarSign className="w-3.5 h-3.5 text-orange-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Gross Sales</span>
                    </div>
                    <p className="text-lg font-black mt-1 text-white">RM {sellerStats.grossRevenue.toFixed(2)}</p>
                  </div>
                  <div className="bg-red-900/30 p-3 rounded-md border border-red-500/20">
                    <div className="flex items-center gap-1.5 text-red-300 justify-center md:justify-start">
                      <Landmark className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Platform Fee (5%)</span>
                    </div>
                    <p className="text-lg font-black mt-1 text-red-200">- RM {sellerStats.platformFees.toFixed(2)}</p>
                  </div>
                  <div className="bg-emerald-900/40 p-3 rounded-md border border-emerald-500/30 relative overflow-hidden group">
                    <div className="relative z-10">
                      <div className="flex items-center gap-1.5 text-emerald-400 justify-center md:justify-start">
                        <Wallet className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Net Profit</span>
                      </div>
                      <p className="text-lg font-black mt-1 text-emerald-300">RM {sellerStats.netProfit.toFixed(2)}</p>
                    </div>
                    <button 
                      onClick={() => {
                        if (sellerStats.pendingSettlement > 0) {
                          alertToast(`RM ${sellerStats.pendingSettlement.toFixed(2)} sent to registered Bank Account!`);
                          setSellerStats(prev => ({ ...prev, pendingSettlement: 0 }));
                        }
                      }}
                      className="mt-2 w-full bg-emerald-600 hover:bg-emerald-500 text-white text-[9px] py-1.5 rounded shadow-sm font-bold transition relative z-10"
                    >
                      Withdraw RM {sellerStats.pendingSettlement.toFixed(2)}
                    </button>
                    {/* Decorative glow */}
                    <div className="absolute top-0 right-0 -mr-4 -mt-4 w-16 h-16 bg-emerald-500/20 blur-2xl rounded-full"></div>
                  </div>
                  <div className="bg-white/5 p-3 rounded-md border border-white/5">
                    <div className="flex items-center gap-1.5 text-gray-400 justify-center md:justify-start">
                      <CheckCircle className="w-3.5 h-3.5 text-orange-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Orders</span>
                    </div>
                    <p className="text-lg font-black mt-1">{sellerStats.ordersCompleted}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-md border border-white/5">
                    <div className="flex items-center gap-1.5 text-gray-400 justify-center md:justify-start">
                      <Package className="w-3.5 h-3.5 text-orange-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Low Stock</span>
                    </div>
                    <p className="text-lg font-black mt-1 text-yellow-300">{sellerStats.lowStockCount}</p>
                  </div>
                </div>
              </div>

              {/* Seller main layout split */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Add / Edit New Product Form */}
                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm lg:col-span-1">
                    <h3 className="font-bold text-gray-800 text-base mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                      <Plus className="w-5 h-5 text-[#f53d2d]" />
                      List a New Product
                    </h3>

                    <form onSubmit={handleAddNewProduct} className="space-y-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Product Title</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Mechanical Ergonomic RGB Keyboard"
                          className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-orange-500"
                          value={newProdName}
                          onChange={(e) => setNewProdName(e.target.value)}
                        />
                      </div>

                      {/* Category, Price and Stock */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Category</label>
                          <select 
                            className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-orange-500"
                            value={newProdCategory}
                            onChange={(e) => setNewProdCategory(e.target.value)}
                          >
                            <option>Electronics</option>
                            <option>Fashion</option>
                            <option>Beauty</option>
                            <option>Home & Living</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Stock</label>
                          <input 
                            type="number" 
                            placeholder="Qty"
                            className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-orange-500"
                            value={newProdStock}
                            onChange={(e) => setNewProdStock(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Pricing Details */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Selling Price (RM)</label>
                          <input 
                            type="number" 
                            placeholder="e.g. 149"
                            className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-orange-500 font-semibold text-orange-600"
                            value={newProdPrice}
                            onChange={(e) => setNewProdPrice(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Retail Price (RM)</label>
                          <input 
                            type="number" 
                            placeholder="e.g. 299"
                            className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-orange-500 text-gray-400"
                            value={newProdOriginalPrice}
                            onChange={(e) => setNewProdOriginalPrice(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Gemini Smart Assistant Section */}
                      <div className="bg-orange-50 p-3.5 rounded border border-orange-100">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-orange-800">
                          <Sparkles className="w-4 h-4 text-[#f53d2d] fill-current" />
                          <span>Gemini Merchant Copywriting AI</span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-1">Let Gemini write detailed bullet points, marketing hype, and relevant hashtags automatically!</p>
                        
                        <textarea
                          placeholder="Enter short features (e.g. bluetooth, 5 colors, soft cushions, long battery)"
                          className="w-full mt-2.5 px-3 py-1.5 border border-orange-200 rounded text-xs focus:outline-none focus:border-orange-500 bg-white"
                          rows="2"
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                        ></textarea>

                        <button
                          type="button"
                          onClick={generateAIDescription}
                          disabled={isGeneratingDesc}
                          className="w-full mt-2 bg-[#f53d2d] hover:bg-orange-600 text-white font-bold text-xs py-2 rounded shadow transition flex items-center justify-center gap-1.5"
                        >
                          {isGeneratingDesc ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              Gemini is thinking...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3.5 h-3.5" />
                              Write High-Converting Copy
                            </>
                          )}
                        </button>
                        {aiError && <p className="text-[10px] text-red-600 mt-1.5 text-center">{aiError}</p>}
                      </div>

                      {/* Imagen 4 Sim - Product Cover Graphic */}
                      <div className="bg-amber-50 p-3.5 rounded border border-amber-200">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                          <ImageIcon className="w-4 h-4 text-amber-600" />
                          <span>Gemini Cover Photo Designer</span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-1">Enter a description to render custom Cover graphics for your product visual.</p>
                        
                        <input 
                          type="text"
                          placeholder="e.g. minimalist mechanical keyboard with teal keycaps"
                          className="w-full mt-2 px-3 py-1.5 border border-amber-200 rounded text-xs focus:outline-none focus:border-amber-500 bg-white"
                          value={imagePrompt}
                          onChange={(e) => setImagePrompt(e.target.value)}
                        />

                        <button
                          type="button"
                          onClick={generateAIImage}
                          disabled={isGeneratingImage}
                          className="w-full mt-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-2 rounded shadow transition flex items-center justify-center gap-1.5"
                        >
                          {isGeneratingImage ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              Designing Cover...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3.5 h-3.5" />
                              Generate Product Mockup
                            </>
                          )}
                        </button>
                      </div>

                      {/* Manual / AI-Generated Description Preview & Manual Edits */}
                      <div>
                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Listing Description</label>
                        <textarea 
                          placeholder="Detailed specifications, shipping options, warranty terms..."
                          className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-orange-500 font-mono text-xs"
                          rows="6"
                          value={newProdDescription}
                          onChange={(e) => setNewProdDescription(e.target.value)}
                        ></textarea>
                      </div>

                      {/* Product Image Preview */}
                      <div>
                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Image URL or Preview</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-1.5 border border-gray-200 rounded text-xs focus:outline-none focus:border-orange-500 text-gray-500 bg-gray-50 mb-2"
                          value={newProdImage}
                          onChange={(e) => setNewProdImage(e.target.value)}
                        />
                        <div className="h-32 rounded border border-gray-100 overflow-hidden relative bg-gray-50 flex items-center justify-center">
                          <img 
                            src={newProdImage} 
                            alt="Product visual" 
                            className="h-full object-contain"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80";
                            }}
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button 
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 rounded-lg shadow-md transition flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Publish Listing To Storefront
                      </button>
                    </form>
                  </div>

                  {/* Live Inventory List & Management Dashboard */}
                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm lg:col-span-2">
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                      <h3 className="font-bold text-gray-800 text-base flex items-center gap-2">
                        <Package className="w-5 h-5 text-orange-500" />
                        Active Shop Inventory
                      </h3>
                      <span className="text-xs text-gray-500 font-light">Total: {products.length} products listed</span>
                    </div>

                    <div className="space-y-4 overflow-y-auto max-h-[850px] pr-2">
                      {products.map(p => (
                        <div key={p.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100/60 transition">
                          {/* Thumbnail */}
                          <div className="w-20 h-20 bg-white rounded border overflow-hidden shrink-0 flex items-center justify-center">
                            <img 
                              src={p.image} 
                              alt={p.name} 
                              className="h-full object-contain" 
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80";
                              }}
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 flex flex-col justify-between min-w-0">
                            <div>
                              <div className="flex justify-between items-start gap-2">
                                <h4 className="font-bold text-sm text-gray-800 truncate">{p.name}</h4>
                                <span className="text-[10px] bg-gray-200 text-gray-700 font-bold px-2 py-0.5 rounded uppercase">
                                  {p.category}
                                </span>
                              </div>
                              
                              {/* Seller badge */}
                              <p className="text-[10px] text-gray-400">Merchant Seller: {p.seller}</p>

                              <div className="flex items-center gap-4 mt-2">
                                <div>
                                  <span className="text-xs text-gray-500">Listed Price:</span>
                                  <span className="text-sm font-bold text-red-600 ml-1">RM{p.price}</span>
                                </div>
                                <div>
                                  <span className="text-xs text-gray-500">Stock Status:</span>
                                  <span className={`text-xs font-bold ml-1 ${p.stock < 10 ? 'text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100' : 'text-emerald-600'}`}>
                                    {p.stock} units
                                  </span>
                                </div>
                                <div>
                                  <span className="text-xs text-gray-500">Sales count:</span>
                                  <span className="text-xs font-semibold ml-1 text-gray-700">{p.sales}</span>
                                </div>
                              </div>
                            </div>

                            {/* Interactive operations */}
                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-xs">
                              <span className="text-gray-400">Rating: ⭐ {p.rating} / 5.0</span>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    // Simple quick stock restock simulation
                                    setProducts(prev => prev.map(item => {
                                      if (item.id === p.id) {
                                        return { ...item, stock: item.stock + 10 };
                                      }
                                      return item;
                                    }));
                                    alertToast("Restocked +10 units successfully!");
                                  }}
                                  className="text-orange-600 hover:bg-orange-50 font-bold px-2.5 py-1 rounded border border-orange-200 transition"
                                >
                                  Restock (+10)
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (confirm("Are you sure you want to delete this listing?")) {
                                      setProducts(prev => prev.filter(item => item.id !== p.id));
                                      alertToast("Listing removed from storefront!");
                                    }
                                  }}
                                  className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-1 rounded transition"
                                  title="Delete Listing"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                          </div>
                        </div>
                      ))}
                    </div>

                  </div>

                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Shopee Style Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-8 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h5 className="font-bold text-gray-700 mb-3 uppercase">Customer Service</h5>
            <ul className="space-y-1.5">
              <li className="hover:underline cursor-pointer">Help Centre</li>
              <li className="hover:underline cursor-pointer">Shopee Coins</li>
              <li className="hover:underline cursor-pointer">How To Buy</li>
              <li className="hover:underline cursor-pointer">How To Sell</li>
              <li className="hover:underline cursor-pointer">Contact Us</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-gray-700 mb-3 uppercase">About Shopee</h5>
            <ul className="space-y-1.5">
              <li className="hover:underline cursor-pointer">About Us</li>
              <li className="hover:underline cursor-pointer">Careers</li>
              <li className="hover:underline cursor-pointer">Privacy Policy</li>
              <li className="hover:underline cursor-pointer">Shopee Mall</li>
              <li className="hover:underline cursor-pointer">Seller Centre</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-gray-700 mb-3 uppercase">Payment Methods</h5>
            <div className="grid grid-cols-3 gap-2">
              <span className="border p-2 text-center rounded font-bold text-gray-600 hover:border-orange-500 cursor-pointer">VISA</span>
              <span className="border p-2 text-center rounded font-bold text-gray-600 hover:border-orange-500 cursor-pointer">SPayLater</span>
              <span className="border p-2 text-center rounded font-bold text-gray-600 hover:border-orange-500 cursor-pointer">FPX</span>
              <span className="border p-2 text-center rounded font-bold text-gray-600 hover:border-orange-500 cursor-pointer">Cod</span>
              <span className="border p-2 text-center rounded font-bold text-gray-600 hover:border-orange-500 cursor-pointer">Maybank</span>
              <span className="border p-2 text-center rounded font-bold text-gray-600 hover:border-orange-500 cursor-pointer">TouchNGo</span>
            </div>
          </div>
          <div>
            <h5 className="font-bold text-gray-700 mb-3 uppercase">Download Shopee App</h5>
            <p className="mb-2 leading-relaxed">Scan QR code to install Shopee clone app instantly to claim your RM15 welcome voucher!</p>
            <div className="flex gap-2">
              <div className="w-16 h-16 bg-gray-100 flex items-center justify-center font-bold text-[8px] text-gray-400 border rounded">
                QR CODE MOCK
              </div>
              <div className="flex flex-col gap-1">
                <span className="bg-gray-800 text-white px-2 py-1 rounded text-[10px] text-center font-bold cursor-pointer hover:bg-gray-700">App Store</span>
                <span className="bg-gray-800 text-white px-2 py-1 rounded text-[10px] text-center font-bold cursor-pointer hover:bg-gray-700">Google Play</span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 border-t border-gray-100 mt-8 pt-4 text-center">
          <p>© 2026 Shopee Clone Multi-Vendor Marketplace. Powered by React, Tailwind, and Gemini AI. All rights reserved.</p>
        </div>
      </footer>

      {/* ========================================================= */}
      {/* MODAL: REGISTRATION & AUTHENTICATION WALL */}
      {/* ========================================================= */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full overflow-hidden shadow-2xl relative">
            
            {/* Red header bar */}
            <div className="bg-[#f53d2d] text-white p-5 flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-lg flex items-center gap-2">
                  <Lock className="w-5 h-5 text-yellow-300" />
                  {authMode === 'login' ? 'Sign In to Shopee' : 'Create Merchant Account'}
                </h3>
                <p className="text-xs text-orange-100 mt-0.5">Secure buyer & seller portal access</p>
              </div>
              <button 
                onClick={() => setShowAuthModal(false)}
                className="text-white hover:opacity-85"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAuthSubmit} className="p-6 space-y-4">
              
              {/* Account role toggle inside register */}
              {authMode === 'register' && (
                <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Choose your primary account role</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAuthRole('buyer')}
                      className={`py-1.5 text-xs font-bold rounded transition ${authRole === 'buyer' ? 'bg-[#f53d2d] text-white shadow' : 'bg-white text-gray-600 border'}`}
                    >
                      🛒 Customer Buyer
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthRole('seller')}
                      className={`py-1.5 text-xs font-bold rounded transition ${authRole === 'seller' ? 'bg-gray-900 text-white shadow' : 'bg-white text-gray-600 border'}`}
                    >
                      🏬 Merchant Seller
                    </button>
                  </div>
                </div>
              )}

              {/* Full Name for register */}
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Your Full Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Rachel Tan"
                    className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-orange-500"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                  />
                </div>
              )}

              {/* Email address */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="e.g. merchant@shopee.com"
                  className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-orange-500 font-medium"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-orange-500"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                />
              </div>

              {/* Unique Store Name (Sellers only) */}
              {authMode === 'register' && authRole === 'seller' && (
                <div className="bg-orange-50 p-3.5 rounded border border-orange-100">
                  <label className="block text-xs font-bold text-orange-800 uppercase mb-1">Create Unique Store Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Tan Electronics Plaza"
                    className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-orange-500 bg-white"
                    value={authStoreName}
                    onChange={(e) => setAuthStoreName(e.target.value)}
                  />
                  <p className="text-[10px] text-gray-400 mt-1.5 leading-relaxed">Identity validation is required inside your dashboard before you can list live products.</p>
                </div>
              )}

              <button 
                type="submit"
                className="w-full bg-[#f53d2d] hover:bg-red-600 text-white font-bold text-sm py-2.5 rounded shadow transition"
              >
                {authMode === 'login' ? 'Sign In' : 'Agree & Create Account'}
              </button>

              {/* Toggle Login/Register footer */}
              <div className="text-center pt-2 text-xs">
                {authMode === 'login' ? (
                  <p className="text-gray-500">
                    Don't have an account yet?{' '}
                    <button 
                      type="button" 
                      onClick={() => setAuthMode('register')} 
                      className="text-[#f53d2d] font-bold underline"
                    >
                      Register Now
                    </button>
                  </p>
                ) : (
                  <p className="text-gray-500">
                    Already registered?{' '}
                    <button 
                      type="button" 
                      onClick={() => setAuthMode('login')} 
                      className="text-[#f53d2d] font-bold underline"
                    >
                      Sign In
                    </button>
                  </p>
                )}
              </div>

              {/* Mock testing quick instructions */}
              <div className="pt-4 border-t border-gray-100 text-[10px] text-gray-400">
                <span className="font-bold text-gray-500">Fast Testing Login Tip:</span> Enter any email with `seller` in it (e.g. `seller-verify@gmail.com`) to instantly bypass registration with custom pre-loaded seller stores.
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: PRODUCT DETAIL OVERLAY */}
      {/* ========================================================= */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
            
            {/* Close button */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-white/80 p-1.5 rounded-full z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Visual */}
                <div className="aspect-square rounded-lg border overflow-hidden bg-gray-50 flex items-center justify-center">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80";
                    }}
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between">
                  <div>
                    <span className="text-xs bg-orange-100 text-[#f53d2d] font-bold px-2.5 py-1 rounded uppercase">
                      {selectedProduct.category}
                    </span>
                    <h3 className="font-extrabold text-lg text-gray-900 mt-2 leading-tight">
                      {selectedProduct.name}
                    </h3>

                    {/* Ratings */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-amber-500 font-bold flex items-center">
                        ★ {selectedProduct.rating}
                      </span>
                      <span className="text-xs text-gray-300">|</span>
                      <span className="text-xs text-gray-500">{selectedProduct.sales} Sold already</span>
                    </div>

                    {/* Pricing */}
                    <div className="mt-4 bg-orange-50/60 p-3 rounded-lg flex items-baseline gap-2">
                      <span className="text-xs text-[#f53d2d] font-bold">RM</span>
                      <span className="text-2xl font-black text-[#f53d2d]">{selectedProduct.price}</span>
                      <span className="text-xs text-gray-400 line-through">RM{selectedProduct.originalPrice}</span>
                    </div>

                    {/* Seller Name */}
                    <div className="mt-4 p-3 border border-gray-100 rounded-lg bg-gray-50/50">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Store Vendor</p>
                      <h5 className="font-bold text-xs text-gray-800 flex items-center gap-1.5 mt-0.5">
                        <Store className="w-3.5 h-3.5 text-[#f53d2d]" />
                        {selectedProduct.seller}
                      </h5>
                    </div>
                  </div>

                  {/* Add to Cart Controls */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center text-xs mb-3">
                      <span className="text-gray-500">Availability:</span>
                      <span className={`font-bold ${selectedProduct.stock > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {selectedProduct.stock > 0 ? `${selectedProduct.stock} items ready` : 'Out of Stock'}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      disabled={selectedProduct.stock <= 0}
                      className={`w-full py-3 rounded-lg font-bold text-sm text-white shadow-md flex items-center justify-center gap-2 transition ${selectedProduct.stock > 0 ? 'bg-[#f53d2d] hover:bg-red-600' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Shopping Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* Extended Description Tabs */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="font-bold text-xs text-gray-400 uppercase tracking-widest mb-2.5">Detailed Product Specifications</h4>
                <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 leading-relaxed font-mono whitespace-pre-wrap">
                  {selectedProduct.description}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: CART DETAILS PANEL */}
      {/* ========================================================= */}
      {showCart && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-slide-in">
            
            {/* Cart Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#f53d2d] text-white">
              <div className="flex items-center gap-2">
                <CartIcon className="w-5 h-5" />
                <h3 className="font-bold text-lg">My Shopping Cart ({cart.length})</h3>
              </div>
              <button onClick={() => setShowCart(false)} className="text-white hover:opacity-85 p-1 font-bold">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-5xl mb-3">🛒</div>
                  <h4 className="font-bold text-gray-700">Your cart is empty</h4>
                  <p className="text-xs text-gray-400 mt-1">Start adding items from our Daily Discovery!</p>
                  <button 
                    type="button"
                    onClick={() => { setShowCart(false); setCurrentTab('buyer'); }}
                    className="mt-4 bg-[#f53d2d] text-white font-bold text-xs px-4 py-2 rounded shadow"
                  >
                    Go Shop Now
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    {/* Img */}
                    <div className="w-16 h-16 bg-white rounded border overflow-hidden shrink-0 flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="h-full object-contain" />
                    </div>
                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h4 className="font-bold text-xs text-gray-800 truncate">{item.name}</h4>
                        <p className="text-[10px] text-gray-400">Seller: {item.seller}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-bold text-[#f53d2d]">RM{item.price}</span>
                        {/* Stepper */}
                        <div className="flex items-center border border-gray-200 rounded bg-white">
                          <button 
                            type="button"
                            onClick={() => updateCartQuantity(item.id, -1)}
                            className="px-2 py-0.5 text-gray-500 hover:bg-gray-100 font-bold"
                          >
                            -
                          </button>
                          <span className="px-3 text-xs font-bold text-gray-700">{item.quantity}</span>
                          <button 
                            type="button"
                            onClick={() => updateCartQuantity(item.id, 1)}
                            className="px-2 py-0.5 text-gray-500 hover:bg-gray-100 font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Delete */}
                    <button 
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-600 self-center"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer / Checkout Action */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-gray-500">Shipping Fees:</span>
                <span className="text-xs font-bold text-emerald-600">FREE SHIPPING (Promo)</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-sm text-gray-700">Subtotal Amount:</span>
                <span className="text-xl font-extrabold text-[#f53d2d]">RM {cartTotal.toFixed(2)}</span>
              </div>
              <button
                type="button"
                onClick={handleProceedToPayment}
                disabled={cart.length === 0}
                className={`w-full py-3.5 rounded-lg font-bold text-sm text-white shadow-md transition text-center ${cart.length > 0 ? 'bg-[#f53d2d] hover:bg-red-600' : 'bg-gray-300 cursor-not-allowed'}`}
              >
                Checkout & Pay (RM {cartTotal.toFixed(2)})
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: PAYMENT GATEWAY */}
      {/* ========================================================= */}
      {showPaymentGateway && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden shadow-2xl relative">
            
            <div className="bg-gray-900 text-white p-5 flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-lg flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-400" />
                  Secure Checkout
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">Powered by ShopeePay & Stripe Gateway</p>
              </div>
              <button onClick={() => setShowPaymentGateway(false)} className="text-gray-400 hover:text-white transition">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleProcessPayment} className="p-6 space-y-5">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex justify-between items-center">
                <span className="text-sm font-bold text-blue-900">Total Amount Due</span>
                <span className="text-2xl font-black text-blue-700">RM {cartTotal.toFixed(2)}</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Select Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="border-2 border-[#f53d2d] bg-red-50 p-3 rounded-lg flex flex-col items-center justify-center cursor-pointer transition">
                    <CreditCard className="w-6 h-6 text-[#f53d2d] mb-1" />
                    <span className="text-xs font-bold text-red-900">Credit / Debit Card</span>
                  </div>
                  <div className="border border-gray-200 hover:border-gray-300 bg-white p-3 rounded-lg flex flex-col items-center justify-center cursor-pointer transition">
                    <Landmark className="w-6 h-6 text-gray-400 mb-1" />
                    <span className="text-xs font-bold text-gray-600">Online Banking (FPX)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Cardholder Name</label>
                  <input type="text" required placeholder="Name on card" defaultValue={currentUser?.name} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Card Number</label>
                  <input type="text" required placeholder="0000 0000 0000 0000" maxLength="16" className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 font-mono" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Expiry (MM/YY)</label>
                    <input type="text" required placeholder="12/26" maxLength="5" className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">CVV / CVC</label>
                    <input type="password" required placeholder="123" maxLength="3" className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500" />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowPaymentGateway(false)}
                  className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm py-3 rounded-lg transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isProcessingPayment}
                  className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 rounded-lg shadow-md transition flex justify-center items-center gap-2"
                >
                  {isProcessingPayment ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Pay RM {cartTotal.toFixed(2)}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: LOGISTICS TRACKER (MY PURCHASES) */}
      {/* ========================================================= */}
      {showOrdersModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl relative flex flex-col animate-slide-in">
            
            <div className="bg-gray-50 border-b border-gray-200 p-5 flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-lg text-gray-900 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#f53d2d]" />
                  My Purchases & Logistics
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">Track your orders from sellers</p>
              </div>
              <button onClick={() => setShowOrdersModal(false)} className="text-gray-400 hover:text-gray-900 transition bg-white border border-gray-200 rounded-full p-1.5 shadow-sm">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
              {myOrders.length === 0 ? (
                <div className="text-center py-16">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="font-bold text-gray-700">No Orders Yet</h4>
                  <p className="text-sm text-gray-500 mt-1">When you checkout, your orders will appear here for tracking.</p>
                </div>
              ) : (
                myOrders.map(order => (
                  <div key={order.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    {/* Order Header */}
                    <div className="bg-gray-100/50 px-5 py-3 border-b border-gray-100 flex justify-between items-center">
                      <div>
                        <span className="font-bold text-gray-800 text-sm">{order.id}</span>
                        <span className="text-xs text-gray-500 ml-3">Placed on {order.date}</span>
                      </div>
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {order.status}
                      </span>
                    </div>

                    {/* Order Items */}
                    <div className="p-5">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex gap-4 mb-4 last:mb-0">
                          <img src={item.image} className="w-16 h-16 rounded border border-gray-100 object-cover" alt={item.name} />
                          <div className="flex-1">
                            <h5 className="font-bold text-sm text-gray-800">{item.name}</h5>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-[#f53d2d] text-sm">RM {(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tracking Timeline */}
                    <div className="bg-orange-50/50 border-t border-gray-100 p-5">
                      <div className="flex justify-between items-center mb-4">
                        <h6 className="text-xs font-bold text-gray-700 uppercase tracking-widest">Logistics Tracker</h6>
                        <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5 bg-emerald-100/50 px-2.5 py-1 rounded-full border border-emerald-200">
                          <Calendar className="w-4 h-4" />
                          Estimated Delivery: {order.estimatedArrival}
                        </span>
                      </div>
                      
                      {/* Step Progress Bar */}
                      <div className="relative flex justify-between items-center mt-2 px-2 md:px-10">
                        <div className="absolute left-6 right-6 md:left-14 md:right-14 top-1/2 h-1 bg-gray-200 -translate-y-1/2 z-0 rounded-full"></div>
                        <div className="absolute left-6 md:left-14 top-1/2 h-1 bg-emerald-500 w-1/4 -translate-y-1/2 z-0 rounded-full"></div>
                        
                        <div className="relative z-10 flex flex-col items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center border-4 border-orange-50">
                            <CheckCircle className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-bold text-gray-800">Order Placed</span>
                        </div>
                        <div className="relative z-10 flex flex-col items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center border-4 border-orange-50">
                            <Package className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-bold text-gray-800">Processing</span>
                        </div>
                        <div className="relative z-10 flex flex-col items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center border-4 border-orange-50">
                            <Truck className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-bold text-gray-400">Shipped</span>
                        </div>
                        <div className="relative z-10 flex flex-col items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center border-4 border-orange-50">
                            <Clock className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-bold text-gray-400">Delivered</span>
                        </div>
                      </div>
                      <p className="text-center text-[10px] text-gray-500 mt-5 bg-white py-1.5 rounded border border-gray-200 shadow-sm">
                        Seller is currently preparing your parcel. Shopee Express will pick it up soon.
                      </p>
                    </div>

                    <div className="bg-gray-50 px-5 py-4 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-xs text-gray-600">Total Order Value:</span>
                      <span className="text-lg font-black text-gray-900">RM {order.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: SUCCESS CHECKOUT SCREEN */}
      {/* ========================================================= */}
      {checkoutSuccess && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Order Placed Successfully!</h3>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">Your order will be packed by our multi-vendor merchants immediately. Thank you for shopping with Shopee Clone!</p>
            <button
              type="button"
              onClick={() => setCheckoutSuccess(false)}
              className="mt-5 w-full bg-[#f53d2d] hover:bg-red-600 text-white font-bold py-2.5 rounded-lg transition text-sm"
            >
              Back To Shopping Mall
            </button>
          </div>
        </div>
      )}

    </div>
  );
}