import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Users, TrendingUp, BookOpen, Star, Clock } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-600/5 dark:to-purple-600/5" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-8 animate-in fade-in duration-500">
              <Sparkles className="h-4 w-4 mr-2" />
              Welcome to The Blog
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-6 animate-in slide-in-from-bottom-4 duration-700 delay-100">
              Stories that
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                inspire
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-in slide-in-from-bottom-4 duration-700 delay-200">
              Discover amazing stories, insights, and ideas from our community of writers. 
              Stay informed with the latest trends and thoughtful content that matters.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in slide-in-from-bottom-4 duration-700 delay-300">
              <Link href="/posts">
                <Button size="lg" className="flex items-center space-x-2 px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  <span>Explore Posts</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl glass-effect hover:shadow-xl transition-all duration-300 animate-in slide-in-from-left duration-700 delay-400">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-lg">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                100+
              </h3>
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                Quality Articles
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl glass-effect hover:shadow-xl transition-all duration-300 animate-in slide-in-from-bottom-4 duration-700 delay-500">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                10K+
              </h3>
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                Active Readers
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl glass-effect hover:shadow-xl transition-all duration-300 animate-in slide-in-from-right duration-700 delay-600">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-lg">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                50+
              </h3>
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                Expert Writers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Blog?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're committed to delivering the best reading experience with quality content and modern design.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 animate-in slide-in-from-bottom-4 duration-700 delay-700">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-3 w-12 h-12 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Quality Content
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Carefully curated articles and posts from talented writers and thought leaders across various industries.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 animate-in slide-in-from-bottom-4 duration-700 delay-800">
              <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl p-3 w-12 h-12 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Community Driven
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Join a vibrant community of readers and writers sharing knowledge and experiences.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 animate-in slide-in-from-bottom-4 duration-700 delay-900">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-3 w-12 h-12 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Always Fresh
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Fresh content added regularly to keep you informed and inspired with the latest trends.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 animate-in slide-in-from-bottom-4 duration-700 delay-1000">
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-3 w-12 h-12 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Premium Experience
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Enjoy a clean, distraction-free reading experience designed for maximum comfort and engagement.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 animate-in slide-in-from-bottom-4 duration-700 delay-1100">
              <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl p-3 w-12 h-12 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Trending Topics
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Stay ahead with trending topics and insights that matter in today's fast-paced world.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 animate-in slide-in-from-bottom-4 duration-700 delay-1200">
              <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl p-3 w-12 h-12 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Easy Reading
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Optimized typography and layout for comfortable reading across all devices and screen sizes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Reading?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of readers who trust us for quality content and insights.
          </p>
          <Link href="/posts">
            <Button size="lg" variant="secondary" className="px-8 py-4 text-lg bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <span>Browse All Posts</span>
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}