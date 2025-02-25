import React, { useState } from 'react';
import { ArrowUp, BookOpen, Brain, Clock, Coffee, Globe, GraduationCap, Heart, Instagram, Facebook, Twitter, MessageCircle, Star, Target, Users } from 'lucide-react';

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showThankYou, setShowThankYou] = useState(false);
  const [vittoriaOpen, setVittoriaOpen] = useState(false);
  const [vittoriaMessage, setVittoriaMessage] = useState('');
  const [vittoriaResponses, setVittoriaResponses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Scroll to top functionality
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 5000);
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleVittoriaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vittoriaMessage.trim() || isLoading) return;

    const userMessage = vittoriaMessage;
    setVittoriaMessage('');
    setVittoriaResponses(prev => [...prev, `Tu: ${userMessage}`]);
    setIsLoading(true);

    try {
      const response = await fetch('https://n8ndigi.pymeinside.com/webhook/a7f07232-b9af-422c-9231-5760c1ee1f44/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      setVittoriaResponses(prev => [...prev, `VittorIA: ${data.response || data.message || 'Mi dispiace, non ho capito.'}`]);
    } catch (error) {
      console.error('Error sending message:', error);
      setVittoriaResponses(prev => [...prev, 'VittorIA: Mi dispiace, c\'è stato un errore. Riprova più tardi.']);
    } finally {
      setIsLoading(false);
    }
  };

  const blogPosts = [
    {
      id: 1,
      title: "La Magia del Caffè Italiano",
      excerpt: "Descubre la rica tradición del café en Italia y cómo ha influido en la cultura mundial.",
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80",
      category: "Cultura Italiana"
    },
    {
      id: 2,
      title: "Dante Alighieri: El Padre de la Lengua Italiana",
      excerpt: "Explora la vida y obra del poeta que definió el italiano moderno.",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80",
      category: "Obras Literarias"
    },
    {
      id: 3,
      title: "Tips para Dominar los Verbos Irregulares",
      excerpt: "Guía práctica para memorizar y utilizar correctamente los verbos irregulares más comunes.",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80",
      category: "Aprender Italiano"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80"
            alt="Italian landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        {/* Navigation */}
        <nav className="relative z-10 flex justify-between items-center px-6 py-4">
          <div className="flex items-center space-x-2 text-white">
            <Globe className="h-8 w-8" />
            <span className="text-2xl font-bold">ItalicIA</span>
          </div>
          <div className="hidden md:flex space-x-8 text-white">
            <a href="#features" className="hover:text-green-400 transition">Características</a>
            <a href="#about" className="hover:text-green-400 transition">Sobre Nosotros</a>
            <a href="#blog" className="hover:text-green-400 transition">Blog</a>
            <a href="#contact" className="hover:text-green-400 transition">Contacto</a>
          </div>
          <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition">
            Iniciar Sesión
          </button>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100vh-80px)] text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Aprende italiano de manera<br />
            <span className="text-green-400">personalizada e inteligente</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl">
            Combina la experiencia docente con inteligencia artificial para un aprendizaje adaptado a tus necesidades
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-red-600 text-white px-8 py-3 rounded-full text-lg hover:bg-red-700 transition">
              Comienza Ahora
            </button>
            <button className="bg-white text-gray-900 px-8 py-3 rounded-full text-lg hover:bg-gray-100 transition">
              Clase de Prueba Gratis
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">¿Por qué elegir ItalicIA?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Brain className="h-12 w-12 text-green-600" />}
              title="Tutor IA 24/7"
              description="Asistencia personalizada y evaluación continua con nuestro tutor basado en inteligencia artificial."
            />
            <FeatureCard
              icon={<BookOpen className="h-12 w-12 text-red-600" />}
              title="Contenido Personalizado"
              description="Material didáctico adaptado a tu nivel y objetivos de aprendizaje."
            />
            <FeatureCard
              icon={<MessageCircle className="h-12 w-12 text-blue-600" />}
              title="Práctica Interactiva"
              description="Ejercicios dinámicos y conversaciones en tiempo real para mejorar tu fluidez."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <StatCard number="1000+" text="Estudiantes Activos" />
          <StatCard number="95%" text="Tasa de Satisfacción" />
          <StatCard number="24/7" text="Soporte Disponible" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Bienvenidos a ItalicIA</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              En ItalicIA creemos que aprender un idioma es mucho más que memorizar palabras: es descubrir una nueva cultura, 
              abrir puertas a nuevas oportunidades y conectar con el mundo.
            </p>
          </div>

          {/* Our Story */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80"
                alt="Teaching Italian"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-6">Nuestra Historia</h3>
              <p className="text-gray-600 mb-6">
                Alicia Tapia es una docente apasionada por la enseñanza y la cultura italiana. A lo largo de su trayectoria, 
                ha ayudado a cientos de estudiantes a alcanzar sus metas lingüísticas, destacándose por su metodología 
                adaptable y su enfoque humano.
              </p>
              <p className="text-gray-600">
                Su compromiso con la excelencia la ha llevado a explorar y adoptar las últimas tendencias en educación, 
                integrando tecnologías avanzadas para optimizar el aprendizaje.
              </p>
            </div>
          </div>

          {/* Mission and Vision */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="bg-green-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <Target className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-2xl font-bold">Nuestra Misión</h3>
              </div>
              <p className="text-gray-600">
                Inspirar y guiar a estudiantes de todo el mundo en su camino hacia el dominio del idioma italiano, 
                a través de una metodología que une experiencia docente y tecnología de vanguardia.
              </p>
            </div>
            <div className="bg-red-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <GraduationCap className="h-8 w-8 text-red-600 mr-3" />
                <h3 className="text-2xl font-bold">Nuestra Visión</h3>
              </div>
              <p className="text-gray-600">
                Convertirnos en un referente internacional en la enseñanza del italiano, promoviendo la cultura 
                y el idioma a través de la innovación educativa.
              </p>
            </div>
          </div>

          {/* What Makes Us Different */}
          <div>
            <h3 className="text-3xl font-bold text-center mb-12">Lo que nos diferencia</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <DifferentiatorCard
                icon={<Brain className="h-8 w-8 text-green-600" />}
                title="Tutor de IA personalizado"
                description="Aprende a tu propio ritmo con nuestra inteligencia artificial, diseñada para adaptarse a tus necesidades."
              />
              <DifferentiatorCard
                icon={<Target className="h-8 w-8 text-red-600" />}
                title="Método basado en resultados"
                description="Cada lección y actividad está diseñada para maximizar tu progreso de manera estructurada y eficiente."
              />
              <DifferentiatorCard
                icon={<Heart className="h-8 w-8 text-blue-600" />}
                title="Conexión cultural"
                description="Más allá del idioma, descubrirás la riqueza de la cultura italiana, desde su historia hasta sus tradiciones."
              />
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-20">
            <h3 className="text-2xl font-bold mb-6">¡Únete a ItalicIA hoy mismo y comienza a escribir tu historia en italiano!</h3>
            <button className="bg-green-600 text-white px-8 py-3 rounded-full text-lg hover:bg-green-700 transition">
              Comienza tu viaje
            </button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-6">Blog ItalicIA</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Benvenuti al nostro blog! Scopri l'Italia con ItalicIA.
          </p>

          {/* Blog Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["Cultura Italiana", "Obras Literarias", "Aprender Italiano", "Noticias"].map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition text-gray-700 hover:text-green-600"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="text-sm text-green-600 font-medium">{post.category}</span>
                  <h3 className="text-xl font-bold mt-2 mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <button className="text-red-600 font-medium hover:text-red-700 transition">
                    Leggi di più →
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Blog Subscription */}
          <div className="mt-16 bg-green-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Ricevi gli aggiornamenti di ItalicIA
            </h3>
            <p className="text-gray-600 mb-6">
              Mantente actualizado con nuestras últimas publicaciones y recursos.
            </p>
            <form className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
                Suscribirse
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-6">Contacto</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              {showThankYou ? (
                <div className="text-center py-12">
                  <h3 className="text-2xl font-bold text-green-600 mb-4">
                    Grazie per il tuo messaggio!
                  </h3>
                  <p className="text-gray-600">Ti risponderemo al più presto.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Asunto
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition transform hover:scale-[1.02]"
                  >
                    Enviar Mensaje
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-gray-50 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
                <div className="space-y-4">
                  <p className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                    <span>contacto@italicIA.com</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-green-600" />
                    <span>+54 9 261 123 4567</span>
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6">Síguenos</h3>
                <div className="flex gap-6">
                  <a href="#" className="text-gray-600 hover:text-green-600 transition">
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-green-600 transition">
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-green-600 transition">
                    <Twitter className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vittoria Interactive Agent */}
      <div className={`fixed bottom-24 right-6 z-50 transition-transform ${vittoriaOpen ? 'translate-y-0' : 'translate-y-[120%]'}`}>
        <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-80">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <Coffee className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h4 className="font-bold mb-2">Ciao! Sono VittorIA</h4>
              <p className="text-gray-600">La tua assistente virtuale per imparare l'italiano. Come posso aiutarti oggi?</p>
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto mb-4 space-y-3">
            {vittoriaResponses.map((msg, index) => (
              <div 
                key={index} 
                className={`p-2 rounded-lg ${msg.startsWith('Tu:') ? 'bg-green-50 ml-8' : 'bg-gray-50 mr-8'}`}
              >
                {msg}
              </div>
            ))}
            {isLoading && (
              <div className="text-center text-gray-500">
                <div className="animate-pulse">VittorIA sta scrivendo...</div>
              </div>
            )}
          </div>
          
          <form onSubmit={handleVittoriaSubmit} className="mt-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={vittoriaMessage}
                onChange={(e) => setVittoriaMessage(e.target.value)}
                placeholder="Scrivi il tuo messaggio..."
                className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
                disabled={isLoading}
              />
              <button
                type="submit"
                className={`px-4 py-2 bg-green-600 text-white rounded-lg transition ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                }`}
                disabled={isLoading}
              >
                <MessageCircle className="h-5 w-5" />
              </button>
            </div>
          </form>

          <div className="mt-4 space-y-2">
            <button 
              onClick={() => setVittoriaMessage('Come funziona ItalicIA?')}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition text-green-600"
            >
              Come funziona ItalicIA?
            </button>
            <button 
              onClick={() => setVittoriaMessage('Voglio iniziare un corso')}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition text-green-600"
            >
              Voglio iniziare un corso
            </button>
            <button 
              onClick={() => setVittoriaMessage('Parlare con un insegnante')}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition text-green-600"
            >
              Parlare con un insegnante
            </button>
          </div>
        </div>
      </div>

      {/* Vittoria Toggle Button */}
      <button
        onClick={() => setVittoriaOpen(!vittoriaOpen)}
        className="fixed bottom-6 right-6 z-50 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 left-6 z-50 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition ${
          showScrollTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StatCard({ number, text }) {
  return (
    <div className="p-6">
      <div className="text-4xl font-bold text-green-600 mb-2">{number}</div>
      <div className="text-gray-600">{text}</div>
    </div>
  );
}

function DifferentiatorCard({ icon, title, description }) {
  return (
    <div className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
      <div className="flex items-center mb-4">
        {icon}
        <h4 className="text-xl font-bold ml-3">{title}</h4>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default App;
