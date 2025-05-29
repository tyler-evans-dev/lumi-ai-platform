'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HorizontalData, VerticalAnalysis } from '@/types/supabase';
import {
  ChevronDown,
  ChevronUp,
  Building,
  User,
  Globe,
  TrendingUp,
  Package,
  Newspaper,
  Share2,
  Brain,
  BarChart,
  Target,
  DollarSign,
  Lightbulb,
  Award,
  BookOpen,
  Calendar,
  Briefcase,
  GraduationCap,
  MessageSquare,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';

type DetailViewProps = {
  item: HorizontalData | VerticalAnalysis | null;
  type: 'horizontal' | 'vertical';
  onClose: () => void;
};

export default function DetailView({ item, type, onClose }: DetailViewProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    overview: true,
    details: true,
    // Add more default expanded sections as needed
  });

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-gray-400">
        <Brain size={48} className="mb-4 text-gray-500" />
        <h3 className="text-xl font-semibold mb-2">No item selected</h3>
        <p className="text-sm text-center">
          Select an item from the Horizontal or Vertical AI panel to view detailed information.
        </p>
      </div>
    );
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const Section = ({ 
    id, 
    title, 
    icon, 
    children 
  }: { 
    id: string; 
    title: string; 
    icon: React.ReactNode; 
    children: React.ReactNode 
  }) => {
    const isExpanded = expandedSections[id] !== false; // Default to expanded if not set
    
    return (
      <div className="mb-4 glass-panel overflow-hidden">
        <button 
          className="w-full p-4 flex items-center justify-between text-left"
          onClick={() => toggleSection(id)}
        >
          <div className="flex items-center gap-2">
            {icon}
            <h3 className="font-semibold">{title}</h3>
          </div>
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-4 pb-4"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Badge component for status indicators
  const Badge = ({ 
    text, 
    color = 'blue' 
  }: { 
    text: string; 
    color?: 'blue' | 'green' | 'purple' | 'amber' | 'red' 
  }) => {
    const colorClasses = {
      blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      green: 'bg-green-500/20 text-green-400 border-green-500/30',
      purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      red: 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    
    return (
      <span className={`text-xs px-2 py-1 rounded-full border ${colorClasses[color]}`}>
        {text}
      </span>
    );
  };

  // Stat component for key metrics
  const Stat = ({ 
    label, 
    value, 
    icon 
  }: { 
    label: string; 
    value: string | number; 
    icon: React.ReactNode 
  }) => (
    <div className="bg-white/5 rounded-lg p-3 flex flex-col items-center justify-center">
      <div className="text-gray-400 mb-1 flex items-center gap-1">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );

  // Render horizontal data (company or contact)
  if (type === 'horizontal') {
    const horizontalItem = item as HorizontalData;
    const isCompany = horizontalItem.entity_type === 'company';
    const enrichedData = horizontalItem.enriched_data as any;
    const metadata = horizontalItem.metadata as any;
    
    return (
      <div className="h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-white/10 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <h2 className="font-semibold text-lg gradient-text">
              {isCompany ? 'Company Details' : 'Contact Profile'}
            </h2>
          </div>
          <Badge 
            text={horizontalItem.status} 
            color={horizontalItem.status === 'enriched' ? 'green' : horizontalItem.status === 'pending' ? 'amber' : 'blue'} 
          />
        </div>
        
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Overview Section */}
          <Section id="overview" title="Overview" icon={isCompany ? <Building size={18} /> : <User size={18} />}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center">
                {metadata?.logo_url || metadata?.avatar_url ? (
                  <img 
                    src={metadata.logo_url || metadata.avatar_url} 
                    alt={horizontalItem.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-white">
                    {horizontalItem.name.substring(0, 2)}
                  </span>
                )}
              </div>
              
              <div>
                <h3 className="text-xl font-bold">{horizontalItem.name}</h3>
                <p className="text-gray-400 text-sm">{horizontalItem.description}</p>
                {metadata?.website && (
                  <a 
                    href={metadata.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 text-xs flex items-center gap-1 mt-1 hover:underline"
                  >
                    <Globe size={12} />
                    {metadata.website.replace(/^https?:\/\//, '')}
                  </a>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-4">
              {isCompany && (
                <>
                  <Stat 
                    label="Founded" 
                    value={enrichedData?.company_details?.founded || 'N/A'} 
                    icon={<Calendar size={14} />} 
                  />
                  <Stat 
                    label="Employees" 
                    value={metadata?.size || 'N/A'} 
                    icon={<User size={14} />} 
                  />
                  <Stat 
                    label="Growth" 
                    value={enrichedData?.company_details?.growth_rate || 'N/A'} 
                    icon={<TrendingUp size={14} />} 
                  />
                  <Stat 
                    label="Industry" 
                    value={metadata?.industry || 'N/A'} 
                    icon={<Briefcase size={14} />} 
                  />
                </>
              )}
              
              {!isCompany && (
                <>
                  <Stat 
                    label="Role" 
                    value={enrichedData?.professional_details?.current_role || 'N/A'} 
                    icon={<Briefcase size={14} />} 
                  />
                  <Stat 
                    label="Company" 
                    value={enrichedData?.professional_details?.company || 'N/A'} 
                    icon={<Building size={14} />} 
                  />
                  <Stat 
                    label="Location" 
                    value={metadata?.location || 'N/A'} 
                    icon={<Globe size={14} />} 
                  />
                  <Stat 
                    label="Influence" 
                    value={enrichedData?.influence_score || 'N/A'} 
                    icon={<Award size={14} />} 
                  />
                </>
              )}
            </div>
            
            <div className="mt-4 text-xs text-gray-400">
              <div className="flex justify-between items-center">
                <span>Source: {horizontalItem.source}</span>
                <span>Updated: {new Date(horizontalItem.updated_at).toLocaleDateString()}</span>
              </div>
            </div>
          </Section>
          
          {/* Company-specific sections */}
          {isCompany && (
            <>
              {/* Company Details Section */}
              <Section id="company_details" title="Company Details" icon={<Building size={18} />}>
                {enrichedData?.company_details && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 p-3 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">Headquarters</div>
                        <div>{enrichedData.company_details.headquarters || 'N/A'}</div>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">CEO</div>
                        <div>{enrichedData.company_details.ceo || 'N/A'}</div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Funding</div>
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-green-400" />
                        <span>{enrichedData.company_details.funding || 'N/A'}</span>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Revenue Range</div>
                      <div>{enrichedData.company_details.revenue_range || 'N/A'}</div>
                    </div>
                    
                    {enrichedData.company_details.public !== undefined && (
                      <div className="bg-white/5 p-3 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">Public Company</div>
                        <div className="flex items-center gap-2">
                          {enrichedData.company_details.public ? (
                            <>
                              <Badge text="Public" color="green" />
                              {enrichedData.company_details.stock_symbol && (
                                <span className="text-gray-300">
                                  Symbol: {enrichedData.company_details.stock_symbol}
                                </span>
                              )}
                            </>
                          ) : (
                            <Badge text="Private" color="blue" />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Section>
              
              {/* Industry Analysis Section */}
              <Section id="industry_analysis" title="Industry Analysis" icon={<BarChart size={18} />}>
                {enrichedData?.industry_analysis && (
                  <div className="space-y-4">
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Market Position</div>
                      <div className="font-medium">{enrichedData.industry_analysis.market_position}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Market Share Distribution</div>
                      <div className="bg-white/5 p-3 rounded-lg">
                        {enrichedData.industry_analysis.competitors && (
                          <div className="space-y-3">
                            {/* Company's own market share */}
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>{horizontalItem.name}</span>
                                <span>{enrichedData.industry_analysis.market_share}</span>
                              </div>
                              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500 rounded-full"
                                  style={{ 
                                    width: enrichedData.industry_analysis.market_share?.replace('%', '') + '%' 
                                  }}
                                ></div>
                              </div>
                            </div>
                            
                            {/* Competitors market share */}
                            {enrichedData.industry_analysis.competitors.map((competitor: any, index: number) => (
                              <div key={index}>
                                <div className="flex justify-between text-xs mb-1">
                                  <span>{competitor.name}</span>
                                  <span>{competitor.market_share}</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-gray-500 rounded-full"
                                    style={{ 
                                      width: competitor.market_share?.replace('%', '') + '%' 
                                    }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {enrichedData.industry_analysis.trends && (
                      <div>
                        <div className="text-sm font-medium mb-2">Industry Trends</div>
                        <ul className="bg-white/5 p-3 rounded-lg space-y-2">
                          {enrichedData.industry_analysis.trends.map((trend: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <TrendingUp size={16} className="text-purple-400 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{trend}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </Section>
              
              {/* Products & Services Section */}
              <Section id="products_services" title="Products & Services" icon={<Package size={18} />}>
                {enrichedData?.products_services && (
                  <div className="space-y-3">
                    {enrichedData.products_services.map((product: any, index: number) => (
                      <div key={index} className="bg-white/5 p-3 rounded-lg">
                        <div className="font-medium mb-1">{product.name}</div>
                        <div className="text-sm text-gray-300">{product.description}</div>
                      </div>
                    ))}
                  </div>
                )}
              </Section>
              
              {/* Recent News Section */}
              <Section id="recent_news" title="Recent News" icon={<Newspaper size={18} />}>
                {enrichedData?.recent_news && (
                  <div className="space-y-3">
                    {enrichedData.recent_news.map((news: any, index: number) => (
                      <div key={index} className="bg-white/5 p-3 rounded-lg">
                        <div className="font-medium mb-1">{news.title}</div>
                        <div className="text-sm text-gray-300 mb-2">{news.summary}</div>
                        <div className="text-xs text-gray-400">{news.date}</div>
                      </div>
                    ))}
                  </div>
                )}
              </Section>
              
              {/* Social Presence Section */}
              <Section id="social_presence" title="Social Presence" icon={<Share2 size={18} />}>
                {enrichedData?.social_presence && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Stat 
                        label="Followers" 
                        value={enrichedData.social_presence.followers?.toLocaleString() || 'N/A'} 
                        icon={<User size={14} />} 
                      />
                      <Stat 
                        label="Engagement" 
                        value={enrichedData.social_presence.engagement_rate || 'N/A'} 
                        icon={<MessageSquare size={14} />} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      {enrichedData.social_presence.linkedin && (
                        <a 
                          href={`https://linkedin.com/company/${enrichedData.social_presence.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect x="2" y="9" width="4" height="12"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                              </svg>
                            </div>
                            <span>LinkedIn</span>
                          </div>
                          <ExternalLink size={16} />
                        </a>
                      )}
                      
                      {enrichedData.social_presence.twitter && (
                        <a 
                          href={`https://twitter.com/${enrichedData.social_presence.twitter.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                              </svg>
                            </div>
                            <span>Twitter</span>
                          </div>
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </Section>
            </>
          )}
          
          {/* Contact-specific sections */}
          {!isCompany && (
            <>
              {/* Professional Details Section */}
              <Section id="professional_details" title="Professional Details" icon={<Briefcase size={18} />}>
                {enrichedData?.professional_details && (
                  <div className="space-y-4">
                    {/* Previous Positions */}
                    {enrichedData.professional_details.previous_positions && (
                      <div>
                        <div className="text-sm font-medium mb-2">Previous Positions</div>
                        <div className="space-y-3">
                          {enrichedData.professional_details.previous_positions.map((position: any, index: number) => (
                            <div key={index} className="bg-white/5 p-3 rounded-lg">
                              <div className="font-medium">{position.title}</div>
                              <div className="text-sm text-gray-300">{position.company}</div>
                              <div className="text-xs text-gray-400 mt-1">{position.years}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Education */}
                    {enrichedData.professional_details.education && (
                      <div>
                        <div className="text-sm font-medium mb-2">Education</div>
                        <div className="space-y-3">
                          {enrichedData.professional_details.education.map((edu: any, index: number) => (
                            <div key={index} className="bg-white/5 p-3 rounded-lg">
                              <div className="font-medium">{edu.degree}</div>
                              <div className="text-sm text-gray-300">{edu.institution}</div>
                              <div className="text-xs text-gray-400 mt-1">{edu.year}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Skills */}
                    {enrichedData.professional_details.skills && (
                      <div>
                        <div className="text-sm font-medium mb-2">Skills</div>
                        <div className="flex flex-wrap gap-2">
                          {enrichedData.professional_details.skills.map((skill: string, index: number) => (
                            <Badge key={index} text={skill} color="blue" />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Section>
              
              {/* Publications Section */}
              <Section id="publications" title="Publications" icon={<BookOpen size={18} />}>
                {enrichedData?.publications && (
                  <div className="space-y-3">
                    {enrichedData.publications.map((pub: any, index: number) => (
                      <div key={index} className="bg-white/5 p-3 rounded-lg">
                        <div className="font-medium mb-1">{pub.title}</div>
                        <div className="text-sm text-gray-300">{pub.journal}, {pub.year}</div>
                        <div className="text-xs text-gray-400 mt-1">Citations: {pub.citations}</div>
                      </div>
                    ))}
                  </div>
                )}
              </Section>
              
              {/* Expertise Areas Section */}
              <Section id="expertise" title="Areas of Expertise" icon={<Award size={18} />}>
                {enrichedData?.expertise_areas && (
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {enrichedData.expertise_areas.map((area: string, index: number) => (
                        <Badge key={index} text={area} color="purple" />
                      ))}
                    </div>
                    
                    {enrichedData.speaking_engagements && (
                      <div>
                        <div className="text-sm font-medium mb-2">Speaking Engagements</div>
                        <div className="space-y-2">
                          {enrichedData.speaking_engagements.map((event: any, index: number) => (
                            <div key={index} className="bg-white/5 p-3 rounded-lg">
                              <div className="font-medium">{event.topic}</div>
                              <div className="text-sm text-gray-300">{event.event}, {event.year}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Section>
              
              {/* Social Profiles Section */}
              <Section id="social_profiles" title="Social Profiles" icon={<Share2 size={18} />}>
                {enrichedData?.social_profiles && (
                  <div className="space-y-3">
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="text-sm font-medium mb-2">Social Reach</div>
                      <div className="text-2xl font-bold">{enrichedData.social_profiles.followers?.toLocaleString() || 'N/A'}</div>
                      <div className="text-xs text-gray-400">Total followers across platforms</div>
                    </div>
                    
                    <div className="space-y-2">
                      {enrichedData.social_profiles.linkedin && (
                        <a 
                          href={`https://linkedin.com/in/${enrichedData.social_profiles.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect x="2" y="9" width="4" height="12"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                              </svg>
                            </div>
                            <span>LinkedIn</span>
                          </div>
                          <ExternalLink size={16} />
                        </a>
                      )}
                      
                      {enrichedData.social_profiles.twitter && (
                        <a 
                          href={`https://twitter.com/${enrichedData.social_profiles.twitter.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                              </svg>
                            </div>
                            <span>Twitter</span>
                          </div>
                          <ExternalLink size={16} />
                        </a>
                      )}
                      
                      {enrichedData.social_profiles.github && (
                        <a 
                          href={`https://github.com/${enrichedData.social_profiles.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                              </svg>
                            </div>
                            <span>GitHub</span>
                          </div>
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </Section>
            </>
          )}
        </div>
      </div>
    );
  }
  
  // Render vertical analysis
  if (type === 'vertical') {
    const verticalItem = item as VerticalAnalysis;
    const analysisResults = verticalItem.analysis_results as any;
    const agentConfig = verticalItem.agent_config as any;
    const metadata = verticalItem.metadata as any;
    
    return (
      <div className="h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-white/10 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <h2 className="font-semibold text-lg gradient-text">
              {verticalItem.analysis_type}
            </h2>
          </div>
          <Badge 
            text={verticalItem.status} 
            color={verticalItem.status === 'completed' ? 'green' : verticalItem.status === 'pending' ? 'amber' : 'blue'} 
          />
        </div>
        
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Overview Section */}
          <Section id="analysis_overview" title="Analysis Overview" icon={<Brain size={18} />}>
            <div className="space-y-4">
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h3 className="font-medium mb-2">Executive Summary</h3>
                <p className="text-sm">{analysisResults?.executive_summary}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Stat 
                  label="Analysis Time" 
                  value={metadata?.duration || 'N/A'} 
                  icon={<Clock size={14} />} 
                />
                <Stat 
                  label="Confidence" 
                  value={metadata?.confidence_score ? `${(metadata.confidence_score * 100).toFixed(0)}%` : 'N/A'} 
                  icon={<Target size={14} />} 
                />
              </div>
              
              <div className="bg-white/5 p-3 rounded-lg">
                <h3 className="text-sm font-medium mb-2">Agent Configuration</h3>
                {agentConfig?.agents && (
                  <div className="mb-3">
                    <div className="text-xs text-gray-400 mb-1">Agents Used</div>
                    <div className="flex flex-wrap gap-2">
                      {agentConfig.agents.map((agent: string, index: number) => (
                        <Badge key={index} text={agent} color="purple" />
                      ))}
                    </div>
                  </div>
                )}
                
                {agentConfig?.depth && (
                  <div className="mb-3">
                    <div className="text-xs text-gray-400 mb-1">Analysis Depth</div>
                    <div>
                      <Badge 
                        text={agentConfig.depth} 
                        color={
                          agentConfig.depth === 'comprehensive' ? 'purple' : 
                          agentConfig.depth === 'detailed' ? 'blue' : 'green'
                        } 
                      />
                    </div>
                  </div>
                )}
                
                {agentConfig?.focus_areas && (
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Focus Areas</div>
                    <div className="flex flex-wrap gap-2">
                      {agentConfig.focus_areas.map((area: string, index: number) => (
                        <Badge key={index} text={area} color="blue" />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="text-xs text-gray-400 flex justify-between">
                <span>Created: {new Date(verticalItem.created_at).toLocaleDateString()}</span>
                <span>Updated: {new Date(verticalItem.updated_at).toLocaleDateString()}</span>
              </div>
            </div>
          </Section>
          
          {/* Key Findings Section */}
          {analysisResults?.key_findings && (
            <Section id="key_findings" title="Key Findings" icon={<Lightbulb size={18} />}>
              <div className="space-y-3">
                {analysisResults.key_findings.map((finding: any, index: number) => (
                  <div key={index} className="bg-white/5 p-3 rounded-lg">
                    <h3 className="font-medium mb-1">{finding.title}</h3>
                    <p className="text-sm text-gray-300">{finding.details}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}
          
          {/* Market Analysis Section */}
          {analysisResults?.market_analysis && (
            <Section id="market_analysis" title="Market Analysis" icon={<BarChart size={18} />}>
              <div className="space-y-4">
                {analysisResults.market_analysis.total_addressable_market && (
                  <div className="bg-white/5 p-3 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Total Addressable Market</div>
                    <div className="font-medium">{analysisResults.market_analysis.total_addressable_market}</div>
                  </div>
                )}
                
                {analysisResults.market_analysis.growth_rate && (
                  <div className="bg-white/5 p-3 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Growth Rate</div>
                    <div className="font-medium">{analysisResults.market_analysis.growth_rate}</div>
                  </div>
                )}
                
                {analysisResults.market_analysis.market_drivers && (
                  <div>
                    <div className="text-sm font-medium mb-2">Market Drivers</div>
                    <ul className="bg-white/5 p-3 rounded-lg space-y-2">
                      {analysisResults.market_analysis.market_drivers.map((driver: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <TrendingUp size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{driver}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Section>
          )}
          
          {/* Growth Opportunities Section */}
          {analysisResults?.growth_opportunities && (
            <Section id="growth_opportunities" title="Growth Opportunities" icon={<TrendingUp size={18} />}>
              <div className="space-y-3">
                {analysisResults.growth_opportunities.map((opportunity: any, index: number) => (
                  <div key={index} className="bg-white/5 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{opportunity.opportunity}</h3>
                      <Badge 
                        text={opportunity.potential_impact} 
                        color={
                          opportunity.potential_impact === 'High' ? 'green' : 
                          opportunity.potential_impact === 'Medium' ? 'blue' : 'amber'
                        } 
                      />
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{opportunity.description}</p>
                    <div className="text-xs text-gray-400">Timeframe: {opportunity.timeframe}</div>
                  </div>
                ))}
              </div>
            </Section>
          )}
          
          {/* Financial Analysis Section */}
          {analysisResults?.financial_analysis && (
            <Section id="financial_analysis" title="Financial Analysis" icon={<DollarSign size={18} />}>
              <div className="space-y-3">
                {Object.entries(analysisResults.financial_analysis).map(([key, value]: [string, any], index: number) => (
                  <div key={index} className="bg-white/5 p-3 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">
                      {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </div>
                    <div className="text-sm">{value}</div>
                  </div>
                ))}
              </div>
            </Section>
          )}
          
          {/* Investment Thesis Section */}
          {analysisResults?.investment_thesis && (
            <Section id="investment_thesis" title="Investment Thesis" icon={<DollarSign size={18} />}>
              <div className="space-y-4">
                {analysisResults.investment_thesis.strengths && (
                  <div>
                    <div className="text-sm font-medium mb-2 text-green-400">Strengths</div>
                    <ul className="bg-white/5 p-3 rounded-lg space-y-2">
                      {analysisResults.investment_thesis.strengths.map((strength: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="text-green-400 mt-0.5">+</div>
                          <span className="text-sm">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {analysisResults.investment_thesis.risks && (
                  <div>
                    <div className="text-sm font-medium mb-2 text-red-400">Risks</div>
                    <ul className="bg-white/5 p-3 rounded-lg space-y-2">
                      {analysisResults.investment_thesis.risks.map((risk: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="text-red-400 mt-0.5">-</div>
                          <span className="text-sm">{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {analysisResults.investment_thesis.valuation_analysis && (
                  <div>
                    <div className="text-sm font-medium mb-2">Valuation Analysis</div>
                    <div className="space-y-2">
                      {Object.entries(analysisResults.investment_thesis.valuation_analysis).map(([key, value]: [string, any], index: number) => (
                        <div key={index} className="bg-white/5 p-3 rounded-lg">
                          <div className="text-xs text-gray-400 mb-1">
                            {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </div>
                          <div className="text-sm">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Section>
          )}
          
          {/* Expertise Assessment Section */}
          {analysisResults?.expertise_assessment && (
            <Section id="expertise_assessment" title="Expertise Assessment" icon={<Award size={18} />}>
              <div className="space-y-4">
                {analysisResults.expertise_assessment.core_strengths && (
                  <div>
                    <div className="text-sm font-medium mb-2">Core Strengths</div>
                    <ul className="bg-white/5 p-3 rounded-lg space-y-2">
                      {analysisResults.expertise_assessment.core_strengths.map((strength: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <Award size={16} className="text-purple-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {analysisResults.expertise_assessment.knowledge_depth && (
                  <div className="bg-white/5 p-3 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Knowledge Depth</div>
                    <div className="text-sm">{analysisResults.expertise_assessment.knowledge_depth}</div>
                  </div>
                )}
                
                {analysisResults.expertise_assessment.unique_perspective && (
                  <div className="bg-white/5 p-3 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Unique Perspective</div>
                    <div className="text-sm">{analysisResults.expertise_assessment.unique_perspective}</div>
                  </div>
                )}
              </div>
            </Section>
          )}
          
          {/* Strategic Recommendations Section */}
          {analysisResults?.strategic_recommendations && (
            <Section id="recommendations" title="Strategic Recommendations" icon={<Lightbulb size={18} />}>
              <div className="space-y-2">
                {analysisResults.strategic_recommendations.map((recommendation: string, index: number) => (
                  <div key={index} className="bg-white/5 p-3 rounded-lg flex items-start gap-3">
                    <div className="bg-purple-500/20 text-purple-400 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="text-sm">{recommendation}</div>
                  </div>
                ))}
              </div>
            </Section>
          )}
          
          {/* Additional Insights Section */}
          {analysisResults?.additional_insights && (
            <Section id="additional_insights" title="Additional Insights" icon={<Lightbulb size={18} />}>
              <div className="space-y-2">
                {analysisResults.additional_insights.map((insight: string, index: number) => (
                  <div key={index} className="bg-white/5 p-3 rounded-lg flex items-start gap-3">
                    <div className="text-blue-400 flex-shrink-0 mt-0.5">•</div>
                    <div className="text-sm">{insight}</div>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>
      </div>
    );
  }
  
  return null;
}

// Clock icon component (not included in lucide-react import above)
function Clock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
