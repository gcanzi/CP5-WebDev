import { useState, useEffect } from 'react';

function App() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch('https://api.spoonacular.com/recipes/random?number=5&tags=dessert&apiKey=fd99df46282646fc86a754d918ef55d1');
        const data = await response.json();
        
        const recipes = data.recipes || [];

        const translatedRecipes = await Promise.all(
          recipes.map(async (recipe) => {
            try {
              const translateResponse = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(recipe.title)}&langpair=en|pt-BR`);
              const translateData = await translateResponse.json();
              return { 
                ...recipe, 
                title: translateData.responseData.translatedText || recipe.title 
              };
            } catch (error) {
              console.error('Erro ao traduzir:', error);
              return recipe;
            }
          })
        );

        setDishes(translatedRecipes);
      } catch (error) {
        console.error('Erro ao buscar pratos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md ${scrolled ? 'bg-white/95 shadow-xl' : 'bg-white/80'}`}>
        <nav className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500">GourmetOn</h1>
          <ul className="hidden md:flex gap-8 items-center">
            <li><button onClick={() => scrollToSection('hero')} className="font-medium hover:text-orange-600 transition-colors">Início</button></li>
            <li><button onClick={() => scrollToSection('benefits')} className="font-medium hover:text-orange-600 transition-colors">Benefícios</button></li>
            <li><button onClick={() => scrollToSection('features')} className="font-medium hover:text-orange-600 transition-colors">Funcionalidades</button></li>
            <li><button onClick={() => scrollToSection('testimonials')} className="font-medium hover:text-orange-600 transition-colors">Depoimentos</button></li>
            <li><button onClick={() => scrollToSection('contact')} className="font-medium hover:text-orange-600 transition-colors">Contato</button></li>
          </ul>
          <button className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold">Download</button>
        </nav>
      </header>

      <section id="hero" className="relative pt-24 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-8 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">🍔 Delivery Rápido</span>
              </div>
              <h2 className="text-6xl md:text-7xl font-black text-gray-900 leading-tight">
                Sabor na <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500">palma</span> da sua mão
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">Descubra os melhores restaurantes da sua cidade e receba suas refeições favoritas com rapidez e praticidade.</p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-10 py-5 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300">Baixar Agora</button>
                <button className="bg-white text-gray-800 px-10 py-5 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 border-2 border-gray-200">Ver Cardápio</button>
              </div>
              <div className="flex gap-8 pt-4">
                <div>
                  <p className="text-3xl font-bold text-gray-900">500+</p>
                  <p className="text-gray-600">Restaurantes</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">50k+</p>
                  <p className="text-gray-600">Clientes</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">4.9★</p>
                  <p className="text-gray-600">Avaliação</p>
                </div>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 to-orange-600 rounded-3xl blur-2xl opacity-20"></div>
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=600&fit=crop" alt="Comida deliciosa" className="relative rounded-3xl shadow-2xl w-full transform hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">Vantagens</span>
            <h3 className="text-5xl font-black text-gray-900 mt-3 mb-4">Por que escolher o GourmetOn?</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Experiência completa de delivery com tecnologia de ponta</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative bg-gradient-to-br from-white to-orange-50 p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 border border-orange-100 hover:border-orange-300">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-orange-500 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold mb-3 text-gray-900">Entrega Rápida</h4>
                <p className="text-gray-600 leading-relaxed">Receba seu pedido em até 30 minutos com nosso sistema de entrega otimizado.</p>
              </div>
            </div>
            <div className="group relative bg-gradient-to-br from-white to-orange-50 p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 border border-orange-100 hover:border-orange-300">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-orange-500 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold mb-3 text-gray-900">Variedade de Restaurantes</h4>
                <p className="text-gray-600 leading-relaxed">Mais de 500 restaurantes parceiros com opções para todos os gostos.</p>
              </div>
            </div>
            <div className="group relative bg-gradient-to-br from-white to-orange-50 p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 border border-orange-100 hover:border-orange-300">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-orange-500 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold mb-3 text-gray-900">Pagamento Fácil</h4>
                <p className="text-gray-600 leading-relaxed">Pague com cartão, PIX ou dinheiro de forma segura e prática.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">Cardápio</span>
            <h3 className="text-5xl font-black text-gray-900 mt-3 mb-4">Nossos Doces em Destaque</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Sobremesas selecionadas especialmente para você</p>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-orange-600 border-t-transparent"></div>
              <p className="mt-6 text-gray-600 text-lg">Preparando doces deliciosos...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {dishes.map((dish) => (
                <div key={dish.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col">
                  <div className="relative overflow-hidden">
                    <img src={dish.image} alt={dish.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h5 className="font-bold text-lg mb-3 line-clamp-2 text-gray-900 text-center">{dish.title}</h5>
                    <button className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold mt-auto">Ver Receita</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">Depoimentos</span>
            <h3 className="text-5xl font-black text-gray-900 mt-3 mb-4">O que nossos clientes dizem</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Milhares de clientes satisfeitos em todo o Brasil</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">"Melhor app de delivery que já usei! Entrega super rápida e comida sempre quentinha."</p>
              <p className="font-bold text-gray-900">Maria Silva</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">"Variedade incrível de restaurantes e o pagamento é super fácil. Recomendo!"</p>
              <p className="font-bold text-gray-900">João Santos</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">"Interface intuitiva e promoções toda semana. Virei cliente fiel!"</p>
              <p className="font-bold text-gray-900">Ana Costa</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-orange-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-300 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-2xl mx-auto px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">Newsletter</span>
            <h3 className="text-5xl font-black text-gray-900 mt-3 mb-4">Fique por dentro das novidades</h3>
            <p className="text-xl text-gray-600">Cadastre seu e-mail e receba promoções exclusivas!</p>
          </div>
          <form className="bg-white p-10 rounded-3xl shadow-2xl border border-orange-100" onSubmit={(e) => { e.preventDefault(); alert('Cadastrado com sucesso!'); }}>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">Nome</label>
              <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-200 transition" placeholder="Seu nome completo" required />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">E-mail</label>
              <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-200 transition" placeholder="seu@email.com" required />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white px-6 py-4 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold text-lg">Cadastrar Agora</button>
          </form>
        </div>
      </section>

      <footer className="bg-gradient-to-br from-gray-900 to-black text-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500 mb-4">GourmetOn</h4>
              <p className="text-gray-400">Seu delivery de comida favorito</p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Contato</h5>
              <p className="text-gray-400">contato@gourmeton.com</p>
              <p className="text-gray-400">(11) 9999-9999</p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-600 transition">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-orange-600 transition">Política de Privacidade</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Redes Sociais</h5>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-orange-600 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-600 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p className="mb-2">© 2026 GourmetOn CP5</p></div>
        </div>
      </footer>
    </div>
  );
}

export default App;