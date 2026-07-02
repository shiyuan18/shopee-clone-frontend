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
  Calendar,
  Menu,
  Home as HomeIcon,
  QrCode,
  Smartphone,
  ChevronDown
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
  
  // Mobile check
  const [isMobile, setIsMobile] = useState(false);

  // Monitor Window Resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Modals & Details
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [myOrders, setMyOrders] = useState([]);

  // Advanced Payment Gateway Form States
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'fpx' | 'tng' | 'shopeepay'
  const [fpxBank, setFpxBank] = useState('mbb'); // 'mbb' | 'cimb' | 'pbb' | 'hlb' | 'rhb'
  const [ewalletPhone, setEwalletPhone] = useState('');

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
  const [pdpaAgreed, setPdpaAgreed] = useState(false);

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
    grossRevenue: 1480,
    platformFees: 74,
    netProfit: 1406,
    pendingSettlement: 1406,
    ordersCompleted: 4,
    views: 842,
    lowStockCount: 1
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
      if (!pdpaAgreed) {
        alertToast("⚖️ You must agree to the PDPA terms to register.");
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
      alertToast(`🎉 Welcome to Shopee, ${authName}!`);
      setShowAuthModal(false);
    } else {
      // Mock Login
      const existingUser = {
        name: authEmail.split('@')[0],
        email: authEmail,
        role: authEmail.includes('seller') ? 'seller' : 'buyer',
        storeName: authEmail.includes('seller') ? "Supreme Electro Store" : "Buyer Account Hub",
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

  // Helper component to render clean premium payment methods list
  const renderPaymentMethodSelector = () => {
    const methods = [
      { id: 'card', name: 'Credit / Debit Card', icon: <CreditCard className="w-5 h-5" />, color: 'border-blue-500 bg-blue-50/50 text-blue-800' },
      { id: 'tng', name: 'Touch \'n Go eWallet', icon: <QrCode className="w-5 h-5 text-[#0052b4]" />, color: 'border-blue-500 bg-blue-50/50 text-[#0052b4]' },
      { id: 'shopeepay', name: 'ShopeePay', icon: <Wallet className="w-5 h-5 text-[#f53d2d]" />, color: 'border-orange-500 bg-orange-50/50 text-[#f53d2d]' },
      { id: 'fpx', name: 'FPX Online Banking', icon: <Landmark className="w-5 h-5 text-teal-600" />, color: 'border-teal-500 bg-teal-50/50 text-teal-800' }
    ];

    return (
      <div className="space-y-4">
        <div className="border-b border-gray-100 pb-2">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Select Payment Method</label>
        </div>
        
        {/* Clean, high-fidelity grid system for selectors */}
        <div className="grid grid-cols-2 gap-2.5">
          {methods.map((method) => {
            const isSelected = paymentMethod === method.id;
            return (
              <button
                key={method.id}
                type="button"
                onClick={() => setPaymentMethod(method.id)}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200 ${
                  isSelected 
                    ? `border-2 ${method.color} ring-2 ring-opacity-20 ${
                        method.id === 'shopeepay' ? 'ring-[#f53d2d] border-[#f53d2d]' : 'ring-blue-500 border-blue-500'
                      } font-bold shadow-sm` 
                    : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700 shadow-sm'
                }`}
              >
                <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-white/95' : 'bg-gray-50 text-gray-400'}`}>
                  {method.icon}
                </div>
                <span className="text-[11px] leading-tight font-medium">{method.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Inner Form Fields based on selection - Fully polished */}
        <div className="mt-4 p-4 bg-gray-50/70 rounded-2xl border border-gray-200/80">
          {paymentMethod === 'card' && (
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Visa / Mastercard Secure Processing</span>
              <div>
                <input 
                  type="text" 
                  required 
                  placeholder="Cardholder Full Name" 
                  defaultValue={currentUser?.name}
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm" 
                />
              </div>
              <div>
                <input 
                  type="text" 
                  required 
                  placeholder="Card Number (16 Digits)" 
                  maxLength="16" 
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono shadow-sm" 
                />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <input 
                  type="text" 
                  required 
                  placeholder="Expiry (MM/YY)" 
                  maxLength="5" 
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm" 
                />
                <input 
                  type="password" 
                  required 
                  placeholder="CVV" 
                  maxLength="3" 
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono shadow-sm" 
                />
              </div>
            </div>
          )}

          {paymentMethod === 'fpx' && (
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-teal-700 uppercase tracking-widest block">Direct FPX bank transfer (Malaysia)</span>
              <div className="relative">
                <select
                  value={fpxBank}
                  onChange={(e) => setFpxBank(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 appearance-none shadow-sm font-medium text-gray-700"
                >
                  <option value="mbb">Maybank2u / Maybank</option>
                  <option value="cimb">CIMB Clicks</option>
                  <option value="pbb">Public Bank Online</option>
                  <option value="hlb">Hong Leong Connect</option>
                  <option value="rhb">RHB Now</option>
                  <option value="amb">AmBank</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
              <p className="text-[10px] text-gray-400 leading-normal">You will be redirected to your secure bank gateway to authorize the debit transfer of <strong className="text-gray-600">RM {cartTotal.toFixed(2)}</strong>.</p>
            </div>
          )}

          {(paymentMethod === 'tng' || paymentMethod === 'shopeepay') && (
            <div className="space-y-4 text-center py-2 bg-white rounded-xl border border-gray-200/50 p-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block text-left">
                {paymentMethod === 'tng' ? "Touch 'n Go E-Wallet API Link" : "ShopeePay Integrated Gateway"}
              </span>
              <div className="flex justify-center bg-gray-50 p-4 rounded-xl border w-fit mx-auto shadow-inner">
                <div className="flex flex-col items-center">
                  <QrCode className={`w-24 h-24 ${paymentMethod === 'tng' ? 'text-[#0052b4]' : 'text-[#f53d2d]'}`} />
                  <span className="text-[9px] font-extrabold tracking-widest text-gray-400 mt-2 font-mono">DUMMY SCAN SANDBOX</span>
                </div>
              </div>
              <div className="text-left space-y-1">
                <label className="block text-[9px] text-gray-400 font-extrabold uppercase tracking-wider">OR ENTER REGISTERED MOBILE PHONE NUMBER</label>
                <div className="flex gap-2">
                  <span className="bg-gray-100 text-gray-500 font-bold px-3 py-2 rounded-xl text-xs flex items-center border border-gray-200">+60</span>
                  <input
                    type="tel"
                    required
                    placeholder="123456789"
                    value={ewalletPhone}
                    onChange={(e) => setEwalletPhone(e.target.value)}
                    className="flex-1 px-3.5 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white shadow-sm font-semibold"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Helper component to render the responsive Seller Stats counters cleanly
  const renderSellerStatsDashboard = () => {
    const statsConfig = [
      { label: 'Gross Sales', value: `RM ${sellerStats.grossRevenue.toFixed(2)}`, desc: 'Total incoming funds', icon: <DollarSign className="w-4 h-4 text-white" />, bg: 'from-blue-600 to-indigo-600' },
      { label: 'Platform Fees (5%)', value: `- RM ${sellerStats.platformFees.toFixed(2)}`, desc: 'Commission contribution', icon: <Landmark className="w-4 h-4 text-white" />, bg: 'from-rose-500 to-red-600' },
      { label: 'Net Profit', value: `RM ${sellerStats.netProfit.toFixed(2)}`, desc: 'Available for settlement', icon: <Wallet className="w-4 h-4 text-white" />, bg: 'from-emerald-500 to-teal-600' },
      { label: 'Orders Completed', value: `${sellerStats.ordersCompleted} orders`, desc: 'Delivered shipments', icon: <CheckCircle className="w-4 h-4 text-white" />, bg: 'from-orange-500 to-amber-600' },
      { label: 'Low Stock Items', value: `${sellerStats.lowStockCount} items`, desc: 'Immediate attention needed', icon: <Package className="w-4 h-4 text-white" />, bg: 'from-red-600 to-pink-600' }
    ];

    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6 pt-6 border-t border-white/10">
        {statsConfig.map((stat, index) => {
          const isFullWidthMobile = index === 2; // Make Net Profit stand out on Mobile
          return (
            <div 
              key={index} 
              className={`p-3.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-sm flex flex-col justify-between text-left relative overflow-hidden transition-all duration-300 hover:bg-white/10 ${
                isFullWidthMobile ? 'col-span-2 md:col-span-1 border-emerald-500/20' : 'col-span-1'
              }`}
            >
              <div className="relative z-10 flex items-center justify-between gap-1">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">{stat.label}</span>
                <div className={`p-1.5 rounded-lg bg-gradient-to-r ${stat.bg} shrink-0 shadow-inner`}>
                  {stat.icon}
                </div>
              </div>
              <p className={`text-sm md:text-base font-black tracking-tight mt-3 text-white ${
                index === 1 ? 'text-red-300' : index === 2 ? 'text-emerald-300' : ''
              }`}>
                {stat.value}
              </p>
              <span className="text-[9px] text-gray-400 mt-1 font-light">{stat.desc}</span>
              
              {/* Special withdrawal button inside Net Profit widget */}
              {index === 2 && (
                <button
                  type="button"
                  onClick={() => {
                    if (sellerStats.pendingSettlement > 0) {
                      alertToast(`RM ${sellerStats.pendingSettlement.toFixed(2)} sent securely to registered Bank Account!`);
                      setSellerStats(prev => ({ ...prev, pendingSettlement: 0 }));
                    }
                  }}
                  className="mt-2.5 w-full bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold py-1.5 rounded-lg shadow-sm transition-all duration-200 relative z-10"
                >
                  Withdraw RM {sellerStats.pendingSettlement.toFixed(2)}
                </button>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // =========================================================
  // RENDER SELECTION: MOBILE NATIVE APP VIEW VS DESKTOP WEB
  // =========================================================
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800 antialiased pb-20">
        
        {/* Mobile Header: Clean Floating search, no nested topbars */}
        <header className="sticky top-0 z-40 bg-[#f53d2d] text-white shadow-md px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2" onClick={() => setMobileActiveTab('home')}>
            <div className="bg-white text-[#f53d2d] px-2 py-0.5 rounded font-black text-lg tracking-tighter">S</div>
            <span className="font-extrabold text-sm uppercase tracking-wider">Shopee</span>
          </div>

          <div className="flex-1 max-w-xs relative">
            <div className="flex bg-white/15 backdrop-blur rounded-lg p-1.5 items-center">
              <Search className="w-3.5 h-3.5 text-orange-200 ml-1.5 mr-2" />
              <input 
                type="text" 
                placeholder="Search products..."
                className="w-full bg-transparent text-white placeholder-orange-200 text-xs focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <X className="w-3.5 h-3.5 text-white/70 cursor-pointer mr-1" onClick={() => setSearchQuery('')} />
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 relative">
            <div className="relative p-1" onClick={() => setShowCart(true)}>
              <CartIcon className="w-5.5 h-5.5 text-white" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-[#d0011b] font-black text-[9px] rounded-full w-4 h-4 flex items-center justify-center border border-[#f53d2d]">
                  {cart.length}
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Mobile Tab Screen Render */}
        <div className="flex-1 px-3 py-3">
          
          {/* TAB 1: HOME SHOPPING MALL */}
          {mobileActiveTab === 'home' && (
            <div>
              {/* Campaign Banners */}
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-lg p-4 text-white relative overflow-hidden min-h-[110px] flex flex-col justify-between mb-4 shadow relative">
                <div>
                  <span className="bg-yellow-400 text-red-950 text-[9px] font-black uppercase px-2 py-0.5 rounded">Mega Campaign</span>
                  <h3 className="text-base font-extrabold mt-1">FREE SHIPPING RM0 SPEND!</h3>
                </div>
                <div className="flex gap-1.5 z-10">
                  <button className="bg-white text-red-600 font-bold px-2.5 py-1 rounded text-[9px] shadow">Shop Now</button>
                  <button className="bg-white/20 border border-white/30 text-white font-bold px-2.5 py-1 rounded text-[9px]">Vouchers</button>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-300/20 rounded-full blur-lg"></div>
              </div>

              {/* Flash Sales with timers */}
              <div className="bg-white rounded-lg p-3 mb-4 shadow-sm border border-orange-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[#f53d2d] font-black italic text-sm tracking-wider">⚡ FLASH SALE</span>
                  <div className="flex items-center gap-0.5 font-mono">
                    <span className="bg-gray-900 text-white text-[9px] px-1 py-0.5 rounded font-bold">{String(countdown.hrs).padStart(2, '0')}</span>
                    <span className="text-gray-900 text-[9px] font-bold">:</span>
                    <span className="bg-gray-900 text-white text-[9px] px-1 py-0.5 rounded font-bold">{String(countdown.mins).padStart(2, '0')}</span>
                    <span className="text-gray-900 text-[9px] font-bold">:</span>
                    <span className="bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded">{String(countdown.secs).padStart(2, '0')}</span>
                  </div>
                </div>
                <span className="text-[10px] text-orange-600 font-semibold flex items-center">All deals <ChevronRight className="w-3 h-3" /></span>
              </div>

              {/* Categories Pills */}
              <div className="flex gap-1.5 overflow-x-auto pb-3 scrollbar-none">
                {['All', 'Electronics', 'Fashion', 'Beauty', 'Home & Living'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-[#f53d2d] border-[#f53d2d] text-white shadow-sm' : 'bg-white text-gray-500 border-gray-200'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid Products */}
              <div className="grid grid-cols-2 gap-2">
                {filteredProducts.map(product => {
                  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
                  return (
                    <div 
                      key={product.id} 
                      className="bg-white rounded border border-gray-100 p-2 flex flex-col justify-between relative"
                      onClick={() => setSelectedProduct(product)}
                    >
                      {discount > 0 && (
                        <div className="absolute top-0 right-0 bg-[#ffd13f] text-[#f53d2d] text-[8px] font-black px-1 py-0.5 rounded-bl">
                          {discount}% OFF
                        </div>
                      )}
                      <div className="aspect-square bg-gray-50 rounded overflow-hidden mb-1.5">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <h4 className="text-[11px] text-gray-800 line-clamp-2 leading-tight font-medium mb-1">{product.name}</h4>
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-[9px] text-[#f53d2d] font-bold">RM</span>
                          <span className="text-sm font-bold text-[#f53d2d]">{product.price}</span>
                        </div>
                        <div className="flex items-center justify-between text-[8px] text-gray-400 mt-1 border-t border-gray-50 pt-1">
                          <span>⭐ {product.rating}</span>
                          <span>{product.sales} sold</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: LOGISTICS TRACKER */}
          {mobileActiveTab === 'orders' && (
            <div className="max-w-md mx-auto">
              <h3 className="font-extrabold text-base text-gray-800 flex items-center gap-2 mb-3">
                <Truck className="w-5 h-5 text-[#f53d2d]" />
                My Purchases ({myOrders.length})
              </h3>
              
              {myOrders.length === 0 ? (
                <div className="bg-white rounded-lg p-8 text-center border">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <h4 className="font-bold text-gray-700 text-sm">No Orders Found</h4>
                  <p className="text-xs text-gray-400">Checkout products in your cart to see live tracking maps.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {myOrders.map(order => (
                    <div key={order.id} className="bg-white border rounded-lg p-3 shadow-sm">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100 text-[11px]">
                        <span className="font-bold text-gray-700">{order.id}</span>
                        <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded font-black uppercase text-[8px]">{order.status}</span>
                      </div>
                      <div className="py-2.5 space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex gap-2 text-xs">
                            <img src={item.image} className="w-10 h-10 object-cover rounded border" alt="" />
                            <div className="flex-1 min-w-0">
                              <h5 className="font-bold text-gray-800 truncate">{item.name}</h5>
                              <p className="text-[10px] text-gray-400">Qty: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="bg-gray-50 p-2 rounded text-[10px] text-gray-500 border border-gray-100">
                        <div className="flex justify-between items-center font-bold text-gray-700 mb-1">
                          <span>Shopee Express Logistics</span>
                          <span className="text-emerald-600">Expected: {order.estimatedArrival}</span>
                        </div>
                        <p>Status: Merchant packed parcel, awaiting courier pickup at central sorting hub.</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: GEMINI AI HELPER */}
          {mobileActiveTab === 'ai' && (
            <div className="max-w-md mx-auto bg-white rounded-lg border p-4 shadow-sm space-y-4">
              <div className="flex items-center gap-1.5 text-sm font-bold text-orange-800">
                <Sparkles className="w-5 h-5 text-[#f53d2d] fill-current animate-pulse" />
                <span>Gemini Copywriting Companion</span>
              </div>
              <p className="text-xs text-gray-500">Provide bullet points or specifications below to let Gemini instantly draft high-converting Shopee descriptions!</p>
              
              <textarea 
                placeholder="e.g. noise-canceling, RGB lights, soft leather cushions, 1 year warranty"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="w-full p-2.5 border rounded-lg text-xs focus:outline-none focus:border-orange-500 font-medium"
                rows="3"
              ></textarea>

              <button
                onClick={generateAIDescription}
                disabled={isGeneratingDesc}
                className="w-full bg-[#f53d2d] hover:bg-orange-600 text-white font-bold text-xs py-2.5 rounded-lg shadow-md transition flex items-center justify-center gap-1.5"
              >
                {isGeneratingDesc ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Generating from Gemini...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Write Professional Copy
                  </>
                )}
              </button>

              {newProdDescription && (
                <div className="bg-gray-50 p-3 rounded border border-gray-100 text-xs mt-3">
                  <div className="font-bold text-gray-700 mb-1.5 border-b pb-1 flex justify-between items-center">
                    <span>Generated Output:</span>
                    <button className="text-[#f53d2d] font-bold" onClick={() => {
                      navigator.clipboard.writeText(newProdDescription);
                      alertToast("Copied description to clipboard!");
                    }}>Copy</button>
                  </div>
                  <pre className="font-mono text-[10px] whitespace-pre-wrap leading-relaxed text-gray-600 max-h-40 overflow-y-auto">{newProdDescription}</pre>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SELLER CENTRE MOBILITY */}
          {mobileActiveTab === 'seller' && (
            <div className="max-w-md mx-auto">
              {!currentUser || currentUser.role !== 'seller' ? (
                <div className="bg-white border rounded-xl p-6 text-center shadow-sm">
                  <Store className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <h4 className="font-bold text-gray-800 text-sm">Become a Shopee Seller</h4>
                  <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">Upgrade your customer buyer profile or complete verification to begin listing custom inventory.</p>
                  
                  <button 
                    onClick={() => {
                      if (!currentUser) {
                        setAuthMode('register');
                        setAuthRole('seller');
                        setShowAuthModal(true);
                      } else {
                        setCurrentUser(prev => ({ ...prev, role: 'seller', isVerified: false }));
                        alertToast("Upgraded! Now submit identity verification.");
                      }
                    }}
                    className="mt-4 bg-[#f53d2d] text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow"
                  >
                    Set Up Seller Store
                  </button>
                </div>
              ) : !currentUser.isVerified ? (
                <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
                  <div className="bg-gradient-to-r from-red-600 to-[#f53d2d] p-4 -mx-5 -mt-5 rounded-t-xl text-white">
                    <h3 className="font-black text-sm flex items-center gap-1.5">
                      <ShieldCheck className="w-5 h-5" />
                      Legal Merchant Verification
                    </h3>
                    <p className="text-[10px] text-red-100">Ensure compliant trading in Malaysia under PDPA 2010.</p>
                  </div>

                  <div className="space-y-3.5 text-xs">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-0.5">NRIC or Business License SSM ID</label>
                      <input 
                        type="text" 
                        placeholder="e.g. SSM-20261022-A"
                        className="w-full px-3 py-1.5 border rounded text-xs focus:outline-none bg-white"
                        value={sellerIdNumber}
                        onChange={(e) => setSellerIdNumber(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Upload Merchant Proof (Selfie/License)</label>
                      <button 
                        type="button"
                        onClick={() => setSellerDocumentFile("my_ssm_doc_copy.jpg")}
                        className="w-full border-2 border-dashed p-3 rounded-lg text-center text-gray-500 font-semibold text-[11px] bg-gray-50 hover:bg-gray-100"
                      >
                        {sellerDocumentFile ? `✓ Attached: ${sellerDocumentFile}` : "Choose Document File"}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={instantApproveSeller}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded shadow text-xs"
                    >
                      ⚡ Instant Sandbox verification
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Highly Responsive Stacking Stats Dashboard for Mobile viewports */}
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-5 rounded-2xl shadow-xl space-y-4 border border-white/5">
                    <div>
                      <span className="text-[10px] font-extrabold text-orange-400 uppercase tracking-widest block">Store Hub: {currentUser.storeName}</span>
                      <h4 className="text-lg font-black mt-1">Financial Settlement Analytics</h4>
                    </div>
                    
                    {/* Responsive Flex / Grid stats rendering */}
                    {renderSellerStatsDashboard()}
                  </div>

                  {/* List Item form */}
                  <div className="bg-white border rounded-lg p-4 shadow-sm">
                    <h4 className="font-bold text-xs text-gray-500 uppercase tracking-wider mb-2 border-b pb-1">Publish New Item</h4>
                    <form onSubmit={handleAddNewProduct} className="space-y-3 text-xs">
                      <input 
                        type="text" 
                        placeholder="Product Name"
                        className="w-full px-2.5 py-1.5 border rounded bg-white"
                        value={newProdName}
                        onChange={(e) => setNewProdName(e.target.value)}
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input 
                          type="number" 
                          placeholder="Price (RM)"
                          className="w-full px-2.5 py-1.5 border rounded bg-white"
                          value={newProdPrice}
                          onChange={(e) => setNewProdPrice(e.target.value)}
                        />
                        <input 
                          type="number" 
                          placeholder="Stock Level"
                          className="w-full px-2.5 py-1.5 border rounded bg-white"
                          value={newProdStock}
                          onChange={(e) => setNewProdStock(e.target.value)}
                        />
                      </div>
                      <button type="submit" className="w-full bg-emerald-600 text-white py-2 rounded font-bold shadow text-xs">Publish Item</button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: MY ACCOUNT PROFILE (ME) */}
          {mobileActiveTab === 'me' && (
            <div className="max-w-md mx-auto space-y-4">
              {currentUser ? (
                <div className="bg-white border rounded-xl p-4 shadow-sm space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 text-[#f53d2d] rounded-full flex items-center justify-center font-bold text-lg">
                      {currentUser.name[0]?.toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">{currentUser.name}</h4>
                      <p className="text-[10px] text-gray-400">{currentUser.email}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg text-xs space-y-2 border">
                    <div className="flex justify-between items-center text-gray-600">
                      <span>PDPA Consent Agreement</span>
                      <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[9px] border border-emerald-100">ACTIVE</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600">
                      <span>Data Encrypted (At-Rest)</span>
                      <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded text-[9px] border border-blue-100">AES-256</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setCurrentUser(null);
                      setCart([]);
                      alertToast("Logged out successfully.");
                    }}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs py-2 rounded transition"
                  >
                    Logout Account
                  </button>
                </div>
              ) : (
                <div className="bg-white border rounded-xl p-6 text-center shadow-sm">
                  <User className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <h4 className="font-bold text-gray-800 text-sm">Join Shopee Clone</h4>
                  <p className="text-xs text-gray-500 mt-1">Sign in or create an account to start shopping and trading securely.</p>
                  
                  <div className="mt-4 flex flex-col gap-2">
                    <button 
                      onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
                      className="bg-[#f53d2d] text-white font-bold text-xs py-2.5 rounded-lg shadow"
                    >
                      Login Account
                    </button>
                    <button 
                      onClick={() => { setAuthMode('register'); setShowAuthModal(true); }}
                      className="bg-gray-100 text-gray-700 font-bold text-xs py-2.5 rounded-lg border border-gray-200"
                    >
                      Register Profile
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Mobile Bottom Navigation Bar - Clean, sticky, touch perfect */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-xl flex items-center justify-around py-2.5 px-2">
          <button 
            onClick={() => { setMobileActiveTab('home'); setCurrentTab('buyer'); }}
            className={`flex flex-col items-center gap-1 transition-all ${mobileActiveTab === 'home' ? 'text-[#f53d2d] scale-105' : 'text-gray-400'}`}
          >
            <HomeIcon className="w-5 h-5" />
            <span className="text-[9px] font-bold">Shopping</span>
          </button>
          <button 
            onClick={() => setMobileActiveTab('orders')}
            className={`flex flex-col items-center gap-1 transition-all ${mobileActiveTab === 'orders' ? 'text-[#f53d2d] scale-105' : 'text-gray-400'}`}
          >
            <Truck className="w-5 h-5" />
            <span className="text-[9px] font-bold">Purchases</span>
          </button>
          <button 
            onClick={() => setMobileActiveTab('ai')}
            className={`flex flex-col items-center gap-1 transition-all ${mobileActiveTab === 'ai' ? 'text-[#f53d2d] scale-105' : 'text-gray-400'}`}
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-[9px] font-bold">Gemini AI</span>
          </button>
          <button 
            onClick={() => { setMobileActiveTab('seller'); setCurrentTab('seller'); }}
            className={`flex flex-col items-center gap-1 transition-all ${mobileActiveTab === 'seller' ? 'text-[#f53d2d] scale-105' : 'text-gray-400'}`}
          >
            <Store className="w-5 h-5" />
            <span className="text-[9px] font-bold">Seller Hub</span>
          </button>
          <button 
            onClick={() => setMobileActiveTab('me')}
            className={`flex flex-col items-center gap-1 transition-all ${mobileActiveTab === 'me' ? 'text-[#f53d2d] scale-105' : 'text-gray-400'}`}
          >
            <User className="w-5 h-5" />
            <span className="text-[9px] font-bold">Account</span>
          </button>
        </nav>

        {/* ========================================================= */}
        {/* SHARED MODALS FOR MOBILE SYSTEM VIEWPORTS */}
        {/* ========================================================= */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center">
            <div className="bg-white rounded-t-2xl w-full max-h-[85vh] overflow-y-auto p-4 flex flex-col justify-between shadow-2xl animate-slide-up pb-10">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-orange-100 text-[#f53d2d] text-[10px] font-bold px-2 py-0.5 rounded uppercase">{selectedProduct.category}</span>
                  <X className="w-5 h-5 text-gray-400 cursor-pointer" onClick={() => setSelectedProduct(null)} />
                </div>
                <div className="aspect-square bg-gray-50 rounded overflow-hidden mb-3 max-w-[240px] mx-auto">
                  <img src={selectedProduct.image} alt="" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-extrabold text-sm text-gray-900 leading-tight mb-2">{selectedProduct.name}</h3>
                
                <div className="bg-orange-50/50 p-2.5 rounded-lg flex items-baseline gap-1.5 mb-3">
                  <span className="text-xs font-bold text-[#f53d2d]">RM</span>
                  <span className="text-xl font-black text-[#f53d2d]">{selectedProduct.price}</span>
                  <span className="text-xs text-gray-400 line-through">RM{selectedProduct.originalPrice}</span>
                </div>

                <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg border leading-relaxed mb-4 whitespace-pre-wrap max-h-36 overflow-y-auto">
                  {selectedProduct.description}
                </div>
              </div>

              <div className="flex justify-between items-center text-xs mb-3 border-t pt-3">
                <span className="text-gray-500">Merchant Store: {selectedProduct.seller}</span>
                <span className="font-bold text-emerald-600">Stock: {selectedProduct.stock} units</span>
              </div>
              <button
                onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                className="w-full bg-[#f53d2d] text-white py-3 rounded-lg font-bold shadow-lg"
              >
                Add To Shopping Cart
              </button>
            </div>
          </div>
        )}

        {/* Shopping Cart Modal */}
        {showCart && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
            <div className="bg-white w-full max-w-sm h-full shadow-2xl flex flex-col justify-between animate-slide-in pb-10">
              <div className="p-4 bg-[#f53d2d] text-white flex justify-between items-center">
                <h4 className="font-bold">Cart Items ({cart.length})</h4>
                <X className="w-5 h-5 cursor-pointer" onClick={() => setShowCart(false)} />
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {cart.length === 0 ? (
                  <div className="text-center py-16 text-gray-400">Your cart is empty.</div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-2.5 p-2 bg-gray-50 rounded border items-center">
                      <img src={item.image} className="w-12 h-12 rounded object-cover" alt="" />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-xs text-gray-800 truncate">{item.name}</h5>
                        <p className="text-xs text-[#f53d2d] font-bold">RM {item.price}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <button className="px-1.5 py-0.5 border bg-white rounded font-bold text-xs" onClick={() => updateCartQuantity(item.id, -1)}>-</button>
                          <span className="text-xs font-bold text-gray-700">{item.quantity}</span>
                          <button className="px-1.5 py-0.5 border bg-white rounded font-bold text-xs" onClick={() => updateCartQuantity(item.id, 1)}>+</button>
                        </div>
                      </div>
                      <Trash2 className="w-4 h-4 text-gray-400 cursor-pointer" onClick={() => removeFromCart(item.id)} />
                    </div>
                  ))
                )}
              </div>
              <div className="p-4 border-t bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-gray-500">Shipping:</span>
                  <span className="text-xs font-bold text-emerald-600">FREE SHIPPING</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-gray-700">Subtotal:</span>
                  <span className="text-lg font-black text-[#f53d2d]">RM {cartTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleProceedToPayment}
                  disabled={cart.length === 0}
                  className="w-full bg-[#f53d2d] text-white py-3 rounded-lg font-bold shadow"
                >
                  Checkout and Pay
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Secure Payment Gateway Modal */}
        {showPaymentGateway && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center">
            <div className="bg-white rounded-t-2xl w-full p-4 space-y-4 shadow-2xl animate-slide-up pb-10 max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b pb-2">
                <h4 className="font-black text-sm text-gray-800">Secure Checkout</h4>
                <X className="w-5 h-5 text-gray-400 cursor-pointer" onClick={() => setShowPaymentGateway(false)} />
              </div>
              <form onSubmit={handleProcessPayment} className="space-y-4 text-xs">
                <div className="bg-blue-50 p-3 rounded-lg border text-blue-900 font-bold flex justify-between">
                  <span>Subtotal:</span>
                  <span>RM {cartTotal.toFixed(2)}</span>
                </div>

                {/* Premium Interactive Payment Selector */}
                {renderPaymentMethodSelector()}

                <button
                  type="submit"
                  disabled={isProcessingPayment}
                  className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg shadow mt-2"
                >
                  {isProcessingPayment ? "Processing Secure Payment..." : `Authorize Payment (RM ${cartTotal.toFixed(2)})`}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {checkoutSuccess && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-5 text-center max-w-xs w-full shadow-2xl">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900">Order Placed Successfully!</h3>
              <p className="text-[11px] text-gray-500 mt-1">Sellers have received your payment split details and are packing your items.</p>
              <button onClick={() => setCheckoutSuccess(false)} className="mt-4 bg-[#f53d2d] text-white font-bold text-xs py-2 w-full rounded-lg">Dismiss</button>
            </div>
          </div>
        )}

        {/* Security Auth Modal */}
        {showAuthModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center">
            <div className="bg-white rounded-t-2xl w-full p-4 space-y-4 shadow-2xl animate-slide-up pb-10">
              <div className="flex justify-between items-center">
                <h4 className="font-extrabold text-sm text-gray-800">Authentication Portal</h4>
                <X className="w-5 h-5 text-gray-400 cursor-pointer" onClick={() => setShowAuthModal(false)} />
              </div>
              <form onSubmit={handleAuthSubmit} className="space-y-3.5 text-xs">
                {authMode === 'register' && (
                  <input type="text" placeholder="Your Name" value={authName} onChange={(e) => setAuthName(e.target.value)} required className="w-full p-2 border rounded animate-none" />
                )}
                <input type="email" placeholder="Your Email Address" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} required className="w-full p-2 border rounded" />
                <input type="password" placeholder="Password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} required className="w-full p-2 border rounded" />
                
                {authMode === 'register' && authRole === 'seller' && (
                  <input type="text" placeholder="Create Store Name" value={authStoreName} onChange={(e) => setAuthStoreName(e.target.value)} required className="w-full p-2 border rounded" />
                )}

                <button type="submit" className="w-full bg-[#f53d2d] text-white py-2.5 rounded font-bold">Submit</button>
                <div className="text-center">
                  <button type="button" onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="text-xs text-[#f53d2d] font-bold underline">
                    {authMode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    );
  }

  // =========================================================
  // STANDARD DESKTOP PORTAL VIEW (For larger screens)
  // =========================================================
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

        {/* BUYER TAB */}
        {currentTab === 'buyer' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="md:col-span-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-6 text-white relative overflow-hidden h-48 flex flex-col justify-between shadow-sm relative">
                <div>
                  <span className="bg-yellow-400 text-red-950 text-xs font-black uppercase px-2 py-1 rounded">7.7 Mega Campaign</span>
                  <h2 className="text-3xl font-extrabold mt-2 leading-tight">FREE SHIPPING MIN. SPEND RM0!</h2>
                  <p className="text-orange-100 text-sm mt-1">Claim discount vouchers up to 90% off coins cashback daily.</p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-white text-red-600 font-bold px-4 py-1.5 rounded text-xs shadow hover:bg-orange-50 transition">Shop Campaign</button>
                  <button className="bg-transparent border border-white hover:bg-white/10 text-white font-bold px-4 py-1.5 rounded text-xs transition">Claim Vouchers</button>
                </div>
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

            <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-orange-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h3 className="text-[#f53d2d] font-black text-xl italic tracking-wider flex items-center gap-1">
                  ⚡ FLASH SALE
                </h3>
                <div className="flex items-center gap-1.5 font-mono">
                  <span className="bg-gray-900 text-white font-bold text-xs px-2 py-1 rounded">{String(countdown.hrs).padStart(2, '0')}</span>
                  <span className="text-gray-900 font-bold">:</span>
                  <span className="bg-gray-900 text-white font-bold text-xs px-2 py-1 rounded">{String(countdown.mins).padStart(2, '0')}</span>
                  <span className="text-gray-900 font-bold">:</span>
                  <span className="bg-gray-900 text-white font-bold text-xs px-2 py-1 rounded">{String(countdown.secs).padStart(2, '0')}</span>
                </div>
              </div>
            </div>

            {/* Category selection */}
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

            {/* Grid products */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
              {filteredProducts.map(product => {
                const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
                return (
                  <div 
                    key={product.id} 
                    className="bg-white rounded border border-gray-100 hover:shadow-lg transition duration-200 cursor-pointer flex flex-col justify-between overflow-hidden relative group p-2.5"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {discount > 0 && (
                      <span className="absolute top-0 right-0 bg-[#ffd13f] text-[#f53d2d] text-[10px] font-black px-1.5 py-0.5 rounded-bl">{discount}% OFF</span>
                    )}
                    <div className="aspect-square rounded bg-gray-50 overflow-hidden mb-2">
                      <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition" alt="" />
                    </div>
                    <h4 className="text-xs text-gray-800 line-clamp-2 leading-tight mb-1 font-medium group-hover:text-[#f53d2d] transition">{product.name}</h4>
                    <div className="flex items-baseline gap-1.5 mt-2">
                      <span className="text-xs font-bold text-[#f53d2d]">RM</span>
                      <span className="text-base font-extrabold text-[#f53d2d]">{product.price}</span>
                      <span className="text-[10px] text-gray-400 line-through">RM{product.originalPrice}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1 border-t border-gray-50 pt-1">
                      <span className="text-amber-500 font-bold flex items-center">⭐ {product.rating}</span>
                      <span>{product.sales} sold</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SELLER CENTRE DESKTOP VIEW */}
        {currentTab === 'seller' && (
          <div>
            {!currentUser || currentUser.role !== 'seller' ? (
              <div className="bg-white rounded-xl border p-8 text-center max-w-xl mx-auto shadow-sm my-12">
                <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold">Register as a Merchant Seller</h3>
                <p className="text-xs text-gray-400 mt-1.5 mb-5 max-w-md mx-auto">Build your online e-commerce platform and trade live items safely across Malaysia.</p>
                <button onClick={() => { setAuthRole('seller'); setAuthMode('register'); setShowAuthModal(true); }} className="mt-4 bg-[#f53d2d] text-white font-bold py-2.5 px-6 rounded-lg shadow-md">Become Seller</button>
              </div>
            ) : !currentUser.isVerified ? (
              <div className="bg-white rounded-xl border p-8 text-center max-w-xl mx-auto shadow-sm my-12 space-y-4">
                <ShieldCheck className="w-16 h-16 text-red-500 mx-auto animate-bounce" />
                <h3 className="text-xl font-bold">Merchant Identity Verification</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">Please upload your document license SSM ID copiers to securely authorize your store under local PDPA compliance regulations.</p>
                
                <div className="p-4 bg-gray-50 rounded-xl space-y-2 border text-left max-w-md mx-auto">
                  <input 
                    type="text" 
                    placeholder="Enter NRIC or SSM Number" 
                    value={sellerIdNumber} 
                    onChange={(e) => setSellerIdNumber(e.target.value)} 
                    className="w-full p-2 bg-white border border-gray-200 rounded text-xs focus:outline-none" 
                  />
                  <button 
                    type="button" 
                    onClick={() => setSellerDocumentFile("my_licence.pdf")} 
                    className="w-full bg-white border-2 border-dashed py-3 rounded text-center text-xs text-gray-400 font-semibold"
                  >
                    {sellerDocumentFile ? `✓ File: ${sellerDocumentFile}` : "Attach Document Copy"}
                  </button>
                </div>

                <div className="flex gap-2 justify-center">
                  <button onClick={instantApproveSeller} className="bg-emerald-600 text-white font-bold py-2.5 px-6 rounded-lg text-xs shadow-md">⚡ Instant Admin Approval</button>
                </div>
              </div>
            ) : (
              <div>
                {/* Responsive Merchant Stats banner for Desktop */}
                <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-red-950 text-white p-6 rounded-2xl mb-6 shadow-md border border-white/5">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <span className="text-xs font-bold text-orange-400 block uppercase tracking-wider">Verified Merchant Portal</span>
                      <h2 className="text-2xl font-black mt-1">{currentUser.storeName}</h2>
                    </div>
                  </div>
                  
                  {/* Clean stats integration */}
                  {renderSellerStatsDashboard()}
                </div>

                {/* Seller split listing layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Create product */}
                  <div className="bg-white p-5 rounded-lg border shadow-sm col-span-1">
                    <h3 className="font-bold text-gray-800 text-sm mb-4 pb-2 border-b flex items-center gap-2">
                      <Plus className="w-5 h-5 text-orange-500" />
                      Publish New Product
                    </h3>
                    <form onSubmit={handleAddNewProduct} className="space-y-4 text-xs">
                      <input type="text" placeholder="Product Title" value={newProdName} onChange={(e) => setNewProdName(e.target.value)} required className="w-full p-2.5 border rounded" />
                      <div className="grid grid-cols-2 gap-3">
                        <input type="number" placeholder="Price (RM)" value={newProdPrice} onChange={(e) => setNewProdPrice(e.target.value)} required className="w-full p-2.5 border rounded" />
                        <input type="number" placeholder="Stock" value={newProdStock} onChange={(e) => setNewProdStock(e.target.value)} required className="w-full p-2.5 border rounded" />
                      </div>
                      <div className="bg-orange-50 p-3 rounded border border-orange-100 space-y-2">
                        <span className="text-xs font-bold text-orange-800 flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#f53d2d] fill-current" /> Gemini Assistant AI</span>
                        <textarea placeholder="e.g. noise-canceling, red design, immersive" rows="2" className="w-full p-2 bg-white text-xs border border-orange-200 rounded" value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} />
                        <button type="button" onClick={generateAIDescription} className="w-full bg-[#f53d2d] text-white font-bold text-xs py-1.5 rounded">{isGeneratingDesc ? 'Generating...' : 'Generate Description Copy'}</button>
                      </div>

                      <div className="bg-amber-50 p-3 rounded border border-amber-100">
                        <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5"><ImageIcon className="w-4 h-4 text-amber-600" /> Cover Designer</span>
                        <input type="text" placeholder="e.g. gaming headset white studio photorealistic" className="w-full mt-2 px-2 py-1.5 border border-amber-200 rounded bg-white" value={imagePrompt} onChange={(e) => setImagePrompt(e.target.value)} />
                        <button type="button" onClick={generateAIImage} className="w-full mt-2 bg-amber-600 text-white font-bold py-1.5 rounded">{isGeneratingImage ? 'Designing...' : 'Generate Product Graphic'}</button>
                      </div>

                      <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded font-bold shadow">Publish Listing</button>
                    </form>
                  </div>

                  {/* Active Inventory */}
                  <div className="bg-white p-5 rounded-lg border shadow-sm col-span-2">
                    <h3 className="font-bold text-gray-800 text-sm mb-4 pb-2 border-b flex items-center gap-2">
                      <Package className="w-5 h-5 text-orange-500" />
                      Active Shop Inventory ({products.length})
                    </h3>
                    <div className="space-y-4 max-h-[600px] overflow-y-auto">
                      {products.map(p => (
                        <div key={p.id} className="flex gap-4 p-3 bg-gray-50 rounded border items-center">
                          <img src={p.image} className="w-12 h-12 object-cover rounded border" alt="" />
                          <div className="flex-1">
                            <h4 className="font-bold text-sm text-gray-800">{p.name}</h4>
                            <span className="text-xs text-red-500 font-bold">RM {p.price}</span>
                            <span className="text-xs text-gray-400 ml-4">Stock: {p.stock} units</span>
                          </div>
                          <button onClick={() => {
                            setProducts(prev => prev.map(item => item.id === p.id ? { ...item, stock: item.stock + 10 } : item));
                            alertToast("Restocked +10 units successfully!");
                          }} className="text-xs text-orange-600 font-bold border border-orange-200 px-3 py-1 rounded bg-white hover:bg-orange-50">Restock (+10)</button>
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

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-slide-in">
            <div className="p-4 bg-[#f53d2d] text-white flex justify-between items-center">
              <h3 className="font-bold text-lg">My Shopping Cart ({cart.length})</h3>
              <X className="w-6 h-6 cursor-pointer" onClick={() => setShowCart(false)} />
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex gap-3 bg-gray-50 p-3 rounded border">
                  <img src={item.image} className="w-12 h-12 rounded object-cover" alt="" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-gray-800 truncate">{item.name}</h4>
                    <span className="text-xs font-bold text-[#f53d2d]">RM {item.price}</span>
                    <div className="flex items-center gap-1.5 mt-2">
                      <button className="px-2 py-0.5 border bg-white rounded font-bold" onClick={() => updateCartQuantity(item.id, -1)}>-</button>
                      <span className="text-xs font-bold">{item.quantity}</span>
                      <button className="px-2 py-0.5 border bg-white rounded font-bold" onClick={() => updateCartQuantity(item.id, 1)}>+</button>
                    </div>
                  </div>
                  <Trash2 className="w-4 h-4 text-gray-400 cursor-pointer self-center" onClick={() => removeFromCart(item.id)} />
                </div>
              ))}
            </div>
            <div className="p-4 border-t bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-gray-700">Subtotal Amount:</span>
                <span className="text-xl font-extrabold text-[#f53d2d]">RM {cartTotal.toFixed(2)}</span>
              </div>
              <button onClick={handleProceedToPayment} className="w-full bg-[#f53d2d] text-white py-3 rounded-lg font-bold shadow">Proceed to Payment</button>
            </div>
          </div>
        </div>
      )}

      {/* Payment gateway (Desktop View) */}
      {showPaymentGateway && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden shadow-2xl relative">
            <div className="bg-gray-900 text-white p-5 flex justify-between items-center">
              <h3 className="font-extrabold text-lg flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-400" /> Secure Checkout
              </h3>
              <X className="w-6 h-6 text-gray-400 cursor-pointer" onClick={() => setShowPaymentGateway(false)} />
            </div>
            <form onSubmit={handleProcessPayment} className="p-6 space-y-5">
              <div className="bg-blue-50 p-4 rounded border text-blue-900 font-bold flex justify-between text-sm">
                <span>Total Due:</span>
                <span>RM {cartTotal.toFixed(2)}</span>
              </div>

              {/* Desktop Render Payment Selector */}
              {renderPaymentMethodSelector()}

              <button type="submit" disabled={isProcessingPayment} className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg shadow-md transition flex justify-center items-center gap-2 mt-2">
                {isProcessingPayment ? "Processing..." : `Pay RM {cartTotal.toFixed(2)}`}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Logistics tracking list */}
      {showOrdersModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl relative flex flex-col">
            <div className="bg-gray-50 border-b p-5 flex justify-between items-center">
              <h3 className="font-extrabold text-lg text-gray-900 flex items-center gap-2"><Truck className="w-5 h-5 text-red-500" /> My Purchases & Logistics</h3>
              <X className="w-5 h-5 cursor-pointer text-gray-400" onClick={() => setShowOrdersModal(false)} />
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {myOrders.map(order => (
                <div key={order.id} className="bg-white border rounded-xl overflow-hidden p-4 shadow-sm space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold border-b pb-2">
                    <span>{order.id}</span>
                    <span className="text-emerald-600 font-black">Estimated Delivery: {order.estimatedArrival}</span>
                  </div>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-3 text-xs items-center">
                      <img src={item.image} className="w-10 h-10 rounded border object-cover" alt="" />
                      <div className="flex-1">
                        <h5 className="font-bold text-gray-800">{item.name}</h5>
                        <p className="text-[10px] text-gray-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  <div className="relative flex justify-between items-center mt-3 pt-3 border-t">
                    <span className="text-[10px] text-gray-400">Logistics Status: Packed and handed over to Shopee Express Sorting Centre (Kuala Lumpur Hub).</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Premium Authentication Portal Modal (Restored from image_88fde7.png) */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 max-w-[430px] w-full overflow-hidden relative">
            
            {/* Real Shopee Header style */}
            <div className="bg-[#f53d2d] text-white p-5 pr-12 relative">
              <div className="flex items-center gap-2.5">
                <Lock className="w-5 h-5 text-yellow-300" />
                <h3 className="font-extrabold text-[17px] tracking-wide">
                  {authMode === 'login' ? 'Sign In to Shopee' : 'Create Merchant Account'}
                </h3>
              </div>
              <p className="text-[11px] text-red-100 mt-1 leading-normal">Secure buyer & seller portal access</p>
              
              <button 
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition p-1 hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Auth Form with Legal Consent */}
            <form onSubmit={handleAuthSubmit} className="p-6 space-y-4">
              
              {/* Profile Role Toggle (Register Only) */}
              {authMode === 'register' && (
                <div className="bg-gray-50 p-2 rounded-lg border border-gray-200 flex justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setAuthRole('buyer')}
                    className={`flex-1 py-1.5 rounded-md text-xs font-bold text-center transition ${authRole === 'buyer' ? 'bg-[#f53d2d] text-white shadow' : 'bg-white text-gray-500'}`}
                  >
                    Customer Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthRole('seller')}
                    className={`flex-1 py-1.5 rounded-md text-xs font-bold text-center transition ${authRole === 'seller' ? 'bg-gray-800 text-white shadow' : 'bg-white text-gray-500'}`}
                  >
                    Merchant Store
                  </button>
                </div>
              )}

              {authMode === 'register' && (
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide">Your Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Shiyuan Tan" 
                    value={authName} 
                    onChange={(e) => setAuthName(e.target.value)} 
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-red-500 text-gray-800 bg-white" 
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="e.g. merchant@shopee.com" 
                  value={authEmail} 
                  onChange={(e) => setAuthEmail(e.target.value)} 
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-red-500 text-gray-800 bg-white" 
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide">Password</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••" 
                  value={authPassword} 
                  onChange={(e) => setAuthPassword(e.target.value)} 
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-red-500 text-gray-800 bg-white" 
                />
              </div>

              {authMode === 'register' && authRole === 'seller' && (
                <div className="space-y-1 bg-orange-50/50 p-3 rounded-lg border border-orange-100">
                  <label className="block text-[10px] font-bold text-orange-800 uppercase tracking-wide">Create Custom Store Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Supreme Electro Store" 
                    value={authStoreName} 
                    onChange={(e) => setAuthStoreName(e.target.value)} 
                    className="w-full px-3 py-1.5 border border-orange-200 rounded-lg text-xs focus:outline-none focus:border-red-500 text-gray-800 bg-white" 
                  />
                </div>
              )}

              {/* PDPA Consent Toggles (Malaysian Law Compliance) */}
              {authMode === 'register' && (
                <div className="space-y-2 border-t pt-3 mt-1.5">
                  <div className="flex items-start gap-2 text-[10px] text-gray-500 leading-relaxed">
                    <input 
                      type="checkbox" 
                      required 
                      id="pdpaConsentCheck"
                      checked={pdpaAgreed} 
                      onChange={(e) => setPdpaAgreed(e.target.checked)} 
                      className="mt-0.5 accent-[#f53d2d]" 
                    />
                    <label htmlFor="pdpaConsentCheck" className="cursor-pointer select-none">
                      I explicitly agree to Shopee's privacy regulations and authorize data processing under the <strong>Malaysian Personal Data Protection Act (PDPA) 2010</strong>.
                    </label>
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                className="w-full bg-[#f53d2d] hover:bg-red-600 text-white py-3 rounded-lg font-bold text-xs tracking-wider transition shadow-md"
              >
                {authMode === 'login' ? 'Sign In' : 'Agree & Create Account'}
              </button>

              <div className="text-center pt-1.5 text-xs text-gray-500">
                {authMode === 'login' ? (
                  <span>
                    Don't have an account yet?{' '}
                    <button type="button" onClick={() => setAuthMode('register')} className="text-[#f53d2d] font-bold underline">Register Now</button>
                  </span>
                ) : (
                  <span>
                    Already registered?{' '}
                    <button type="button" onClick={() => setAuthMode('login')} className="text-[#f53d2d] font-bold underline">Sign In</button>
                  </span>
                )}
              </div>

              {/* Secure Testing Tip (Identical to your screenshot image_88fde7.png) */}
              <div className="pt-3 border-t border-gray-100 text-[10px] leading-relaxed text-gray-400">
                <span className="font-bold text-gray-500 block mb-0.5">Fast Testing Login Tip:</span>
                Enter any email with `seller` in it (e.g. `seller-verify@gmail.com`) to instantly bypass registration with custom pre-loaded seller stores.
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Premium Product Detail Overlay (Restored from image_88fa9f.png) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border max-w-xl w-full overflow-hidden relative flex flex-col animate-slide-up">
            
            {/* Close button */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-white/80 p-1 rounded-full z-10 border shadow-sm transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Body */}
            <div className="overflow-y-auto max-h-[85vh] p-6 space-y-4">
              {/* Product Cover image */}
              <div className="aspect-video sm:aspect-[4/3] rounded-lg border overflow-hidden bg-gray-50 flex items-center justify-center relative shadow-inner">
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

              {/* Primary Content (Title & tags) */}
              <div className="space-y-2">
                <span className="inline-block text-[11px] bg-orange-100 text-[#f53d2d] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  {selectedProduct.category}
                </span>
                
                <h3 className="font-extrabold text-lg text-gray-900 leading-snug">
                  {selectedProduct.name}
                </h3>

                {/* Ratings block */}
                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold border-b pb-3 border-gray-100">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{selectedProduct.rating}</span>
                  <span className="text-gray-300 font-light mx-1.5">|</span>
                  <span className="text-gray-400 font-normal">{selectedProduct.sales} Sold already</span>
                </div>
              </div>

              {/* Pricing banner */}
              <div className="bg-orange-50/50 p-4 rounded-xl flex items-baseline gap-2 border border-orange-100/40">
                <span className="text-xs font-bold text-[#f53d2d]">RM</span>
                <span className="text-2xl font-black text-[#f53d2d]">{selectedProduct.price}</span>
                <span className="text-xs text-gray-400 line-through">RM{selectedProduct.originalPrice}</span>
              </div>

              {/* Seller details card */}
              <div className="p-3 bg-gray-50 border rounded-xl flex justify-between items-center text-xs">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold block">Store Vendor</span>
                  <h5 className="font-bold text-gray-800 flex items-center gap-1.5 mt-0.5">
                    <Store className="w-3.5 h-3.5 text-[#f53d2d]" />
                    {selectedProduct.seller}
                  </h5>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold block">Availability</span>
                  <span className={`font-bold text-xs ${selectedProduct.stock > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                    {selectedProduct.stock > 0 ? `${selectedProduct.stock} items ready` : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Product Specifications</span>
                <div className="bg-gray-50 p-3 rounded-lg border text-xs text-gray-600 font-sans leading-relaxed whitespace-pre-wrap max-h-36 overflow-y-auto">
                  {selectedProduct.description}
                </div>
              </div>

              {/* Buy action button */}
              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                disabled={selectedProduct.stock <= 0}
                className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white shadow-md flex items-center justify-center gap-2 transition ${selectedProduct.stock > 0 ? 'bg-[#f53d2d] hover:bg-red-600' : 'bg-gray-400 cursor-not-allowed'}`}
              >
                <CartIcon className="w-4 h-4" />
                Add to Shopping Cart
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}