import { HorizontalData, VerticalAnalysis } from '@/types/supabase';

// Mock user IDs for testing
export const MOCK_USER_ID = 'user_mock_123456789';

// Mock horizontal data (companies and contacts enriched by Exa.ai)
export const mockHorizontalData: HorizontalData[] = [
  {
    id: 'horiz_comp_1',
    user_id: MOCK_USER_ID,
    entity_type: 'company',
    name: 'TechNova Solutions',
    description: 'Leading AI and machine learning solutions provider',
    source: 'manual',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    updated_at: new Date().toISOString(),
    status: 'enriched',
    metadata: {
      logo_url: 'https://placehold.co/400x400/2563eb/ffffff?text=TN',
      website: 'https://technova-solutions.example.com',
      industry: 'Technology',
      size: '500-1000 employees'
    },
    enriched_data: {
      company_details: {
        founded: 2015,
        headquarters: 'San Francisco, CA',
        funding: '$75M Series C',
        revenue_range: '$50M - $100M',
        growth_rate: '27% YoY',
        ceo: 'Sarah Johnson',
        public: false
      },
      industry_analysis: {
        market_position: 'Leader in enterprise AI solutions',
        market_share: '12%',
        competitors: [
          { name: 'AI Dynamics', market_share: '15%' },
          { name: 'Cognitive Systems', market_share: '10%' },
          { name: 'DataMind', market_share: '8%' }
        ],
        trends: [
          'Increasing adoption of AI in healthcare',
          'Growth in predictive analytics solutions',
          'Rising demand for explainable AI'
        ]
      },
      products_services: [
        { name: 'NovaBrain', description: 'Enterprise AI platform' },
        { name: 'NovaInsight', description: 'Predictive analytics suite' },
        { name: 'NovaAssist', description: 'AI-powered customer service automation' }
      ],
      recent_news: [
        { 
          title: 'TechNova Announces Partnership with HealthCorp',
          date: '2025-04-15',
          summary: 'Strategic partnership to develop AI solutions for healthcare diagnostics'
        },
        { 
          title: 'NovaInsight 3.0 Released',
          date: '2025-03-22',
          summary: 'Major update includes advanced forecasting capabilities and improved UI'
        }
      ],
      social_presence: {
        linkedin: 'technova-solutions',
        twitter: '@TechNovaSol',
        followers: 45000,
        engagement_rate: '3.2%'
      }
    }
  },
  {
    id: 'horiz_comp_2',
    user_id: MOCK_USER_ID,
    entity_type: 'company',
    name: 'GreenEarth Renewables',
    description: 'Sustainable energy solutions and carbon capture technology',
    source: 'exa.ai',
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    status: 'enriched',
    metadata: {
      logo_url: 'https://placehold.co/400x400/10b981/ffffff?text=GE',
      website: 'https://greenearth-renewables.example.com',
      industry: 'Clean Energy',
      size: '1000-5000 employees'
    },
    enriched_data: {
      company_details: {
        founded: 2010,
        headquarters: 'Austin, TX',
        funding: '$120M Series D',
        revenue_range: '$100M - $250M',
        growth_rate: '32% YoY',
        ceo: 'Michael Chen',
        public: true,
        stock_symbol: 'GREN'
      },
      industry_analysis: {
        market_position: 'Pioneer in carbon capture technology',
        market_share: '18%',
        competitors: [
          { name: 'SolarFuture', market_share: '22%' },
          { name: 'EcoTech Solutions', market_share: '15%' },
          { name: 'CleanPower Inc', market_share: '12%' }
        ],
        trends: [
          'Accelerating investment in carbon capture',
          'Government incentives for clean energy',
          'Corporate sustainability commitments driving demand'
        ]
      },
      products_services: [
        { name: 'CarbonLock', description: 'Industrial carbon capture system' },
        { name: 'SolarGrid+', description: 'Advanced solar energy management' },
        { name: 'EcoMetrics', description: 'Sustainability reporting platform' }
      ],
      recent_news: [
        { 
          title: 'GreenEarth Secures $50M Government Contract',
          date: '2025-05-10',
          summary: 'Will deploy carbon capture technology in 5 coal power plants'
        },
        { 
          title: 'Annual Sustainability Report Shows 40% Reduction in Client Emissions',
          date: '2025-04-02',
          summary: 'GreenEarth solutions helped clients significantly reduce carbon footprint'
        }
      ],
      social_presence: {
        linkedin: 'greenearth-renewables',
        twitter: '@GreenEarthRenew',
        followers: 78000,
        engagement_rate: '4.1%'
      }
    }
  },
  {
    id: 'horiz_contact_1',
    user_id: MOCK_USER_ID,
    entity_type: 'contact',
    name: 'Dr. Alex Rivera',
    description: 'Chief AI Officer at TechNova Solutions',
    source: 'linkedin',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    updated_at: new Date().toISOString(),
    status: 'enriched',
    metadata: {
      avatar_url: 'https://placehold.co/400x400/6366f1/ffffff?text=AR',
      email: 'alex.rivera@technova-solutions.example.com',
      phone: '+1 (415) 555-0123',
      location: 'San Francisco, CA'
    },
    enriched_data: {
      professional_details: {
        current_role: 'Chief AI Officer',
        company: 'TechNova Solutions',
        previous_positions: [
          { title: 'Director of AI Research', company: 'DataMind', years: '2018-2021' },
          { title: 'Senior ML Engineer', company: 'Google', years: '2015-2018' }
        ],
        education: [
          { degree: 'PhD in Computer Science', institution: 'Stanford University', year: 2015 },
          { degree: 'MS in Machine Learning', institution: 'MIT', year: 2012 }
        ],
        skills: ['Machine Learning', 'Neural Networks', 'Computer Vision', 'NLP', 'AI Ethics']
      },
      publications: [
        { 
          title: 'Advances in Explainable AI for Healthcare Applications',
          journal: 'Journal of AI in Medicine',
          year: 2024,
          citations: 78
        },
        { 
          title: 'Ethical Considerations in Enterprise AI Deployment',
          journal: 'AI Ethics Quarterly',
          year: 2023,
          citations: 124
        }
      ],
      speaking_engagements: [
        { event: 'AI Summit San Francisco', topic: 'The Future of Explainable AI', year: 2025 },
        { event: 'TechCrunch Disrupt', topic: 'AI Ethics in Practice', year: 2024 }
      ],
      social_profiles: {
        linkedin: 'dr-alex-rivera',
        twitter: '@AlexRiveraAI',
        github: 'arivera-ai',
        followers: 28000
      },
      influence_score: 87,
      expertise_areas: ['Explainable AI', 'AI Ethics', 'Enterprise AI Solutions']
    }
  },
  {
    id: 'horiz_contact_2',
    user_id: MOCK_USER_ID,
    entity_type: 'contact',
    name: 'Emma Chen',
    description: 'VP of Sustainability at GreenEarth Renewables',
    source: 'manual',
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    status: 'enriched',
    metadata: {
      avatar_url: 'https://placehold.co/400x400/a855f7/ffffff?text=EC',
      email: 'emma.chen@greenearth-renewables.example.com',
      phone: '+1 (512) 555-0187',
      location: 'Austin, TX'
    },
    enriched_data: {
      professional_details: {
        current_role: 'VP of Sustainability',
        company: 'GreenEarth Renewables',
        previous_positions: [
          { title: 'Director of Environmental Policy', company: 'EcoTech Solutions', years: '2017-2022' },
          { title: 'Environmental Scientist', company: 'EPA', years: '2012-2017' }
        ],
        education: [
          { degree: 'MS in Environmental Engineering', institution: 'UC Berkeley', year: 2012 },
          { degree: 'BS in Environmental Science', institution: 'University of Texas', year: 2010 }
        ],
        skills: ['Sustainability Strategy', 'Carbon Accounting', 'Environmental Policy', 'Stakeholder Engagement']
      },
      publications: [
        { 
          title: 'Corporate Carbon Neutrality: Strategies and Best Practices',
          journal: 'Journal of Sustainable Business',
          year: 2024,
          citations: 45
        },
        { 
          title: 'The Economics of Carbon Capture Technology',
          journal: 'Clean Energy Review',
          year: 2023,
          citations: 87
        }
      ],
      speaking_engagements: [
        { event: 'Climate Tech Summit', topic: 'Scaling Carbon Capture Solutions', year: 2025 },
        { event: 'Sustainable Business Forum', topic: 'Corporate Sustainability Metrics', year: 2024 }
      ],
      social_profiles: {
        linkedin: 'emma-chen-sustainability',
        twitter: '@EmmaChenGreen',
        followers: 15000
      },
      influence_score: 82,
      expertise_areas: ['Carbon Capture', 'Corporate Sustainability', 'Environmental Policy']
    }
  },
  {
    id: 'horiz_comp_3',
    user_id: MOCK_USER_ID,
    entity_type: 'company',
    name: 'HealthSync',
    description: 'AI-powered healthcare diagnostics and patient management',
    source: 'exa.ai',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    updated_at: new Date().toISOString(),
    status: 'enriched',
    metadata: {
      logo_url: 'https://placehold.co/400x400/ec4899/ffffff?text=HS',
      website: 'https://healthsync.example.com',
      industry: 'Healthcare Technology',
      size: '100-500 employees'
    },
    enriched_data: {
      company_details: {
        founded: 2019,
        headquarters: 'Boston, MA',
        funding: '$45M Series B',
        revenue_range: '$10M - $50M',
        growth_rate: '65% YoY',
        ceo: 'Dr. Lisa Patel',
        public: false
      },
      industry_analysis: {
        market_position: 'Emerging leader in AI diagnostics',
        market_share: '8%',
        competitors: [
          { name: 'MedAI Systems', market_share: '12%' },
          { name: 'DiagnosticAI', market_share: '10%' },
          { name: 'HealthTech Solutions', market_share: '9%' }
        ],
        trends: [
          'Integration of AI in clinical workflows',
          'Remote patient monitoring expansion',
          'Regulatory changes supporting digital health'
        ]
      },
      products_services: [
        { name: 'SyncDiagnose', description: 'AI diagnostic assistant for clinicians' },
        { name: 'PatientSync', description: 'Remote patient monitoring platform' },
        { name: 'HealthSync Analytics', description: 'Population health analytics' }
      ],
      recent_news: [
        { 
          title: 'HealthSync Receives FDA Clearance for AI Diagnostic Tool',
          date: '2025-05-18',
          summary: 'SyncDiagnose approved for clinical use in radiology'
        },
        { 
          title: 'New Study Shows 40% Improvement in Diagnostic Accuracy',
          date: '2025-04-30',
          summary: 'Independent study validates HealthSync AI effectiveness'
        }
      ],
      social_presence: {
        linkedin: 'healthsync',
        twitter: '@HealthSyncAI',
        followers: 22000,
        engagement_rate: '3.8%'
      }
    }
  }
];

// Mock vertical analysis data (insights derived from horizontal data)
export const mockVerticalAnalysis: VerticalAnalysis[] = [
  {
    id: 'vert_analysis_1',
    user_id: MOCK_USER_ID,
    horizontal_data_id: 'horiz_comp_1',
    analysis_type: 'Market Opportunity Analysis',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updated_at: new Date().toISOString(),
    status: 'completed',
    agent_config: {
      agents: ['Market Analyst', 'Industry Expert', 'Financial Advisor'],
      depth: 'comprehensive',
      focus_areas: ['growth potential', 'competitive landscape', 'market trends']
    },
    metadata: {
      duration: '3.5 minutes',
      token_usage: 12500,
      confidence_score: 0.89
    },
    analysis_results: {
      executive_summary: "TechNova Solutions is well-positioned in the rapidly growing AI solutions market with strong competitive advantages in enterprise AI. Their focus on explainable AI aligns with market trends and regulatory requirements. Growth opportunities exist in healthcare AI and international expansion.",
      key_findings: [
        {
          title: "Strong Market Position",
          details: "TechNova holds 12% market share in a fragmented market, positioning it among the top 3 players. Their focus on explainable AI creates a competitive advantage as regulations tighten."
        },
        {
          title: "Healthcare Vertical Opportunity",
          details: "Recent partnership with HealthCorp indicates strategic expansion into healthcare, a sector with projected 34% CAGR for AI solutions through 2028."
        },
        {
          title: "Competitive Threats",
          details: "AI Dynamics (15% market share) recently secured $100M funding and is aggressively expanding sales team. This poses a near-term competitive threat."
        }
      ],
      growth_opportunities: [
        {
          opportunity: "Healthcare AI Expansion",
          potential_impact: "High",
          timeframe: "12-18 months",
          description: "Building on HealthCorp partnership to develop specialized healthcare AI solutions could open a $2-3B market opportunity."
        },
        {
          opportunity: "International Expansion",
          potential_impact: "Medium",
          timeframe: "18-24 months",
          description: "European market shows strong demand for explainable AI solutions due to stricter regulatory environment (GDPR, AI Act)."
        }
      ],
      financial_analysis: {
        revenue_growth: "27% YoY growth is above industry average (18%), indicating market share gains",
        profitability: "Estimated 22% profit margin based on industry benchmarks and funding stage",
        valuation: "Estimated $600-750M valuation based on recent funding and comparable companies"
      },
      strategic_recommendations: [
        "Accelerate healthcare AI development through targeted acquisitions of specialized AI startups",
        "Expand enterprise sales team by 30-40% to counter competitive threat from AI Dynamics",
        "Develop GDPR and AI Act compliance features to prepare for European market entry"
      ]
    }
  },
  {
    id: 'vert_analysis_2',
    user_id: MOCK_USER_ID,
    horizontal_data_id: 'horiz_comp_2',
    analysis_type: 'Investment Potential Analysis',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    updated_at: new Date().toISOString(),
    status: 'completed',
    agent_config: {
      agents: ['Financial Analyst', 'CleanTech Expert', 'Policy Specialist'],
      depth: 'comprehensive',
      focus_areas: ['financial performance', 'regulatory landscape', 'technology differentiation']
    },
    metadata: {
      duration: '4.2 minutes',
      token_usage: 14800,
      confidence_score: 0.92
    },
    analysis_results: {
      executive_summary: "GreenEarth Renewables represents a strong investment opportunity with industry-leading carbon capture technology and favorable regulatory tailwinds. The company's public status (GREN) provides liquidity, while recent government contracts demonstrate market validation and revenue stability.",
      key_findings: [
        {
          title: "Technology Leadership",
          details: "GreenEarth's CarbonLock technology demonstrates 15-20% higher efficiency than competitors, creating sustainable competitive advantage in the carbon capture market."
        },
        {
          title: "Favorable Policy Environment",
          details: "Recent Inflation Reduction Act provides $369B for climate solutions, with specific incentives for carbon capture technologies ($85/ton tax credit)."
        },
        {
          title: "Strong Financial Performance",
          details: "32% YoY growth exceeds industry average (24%). Recent $50M government contract provides revenue stability and validates technology."
        }
      ],
      market_analysis: {
        total_addressable_market: "$50B by 2030 for carbon capture technology",
        growth_rate: "CAGR of 38% projected through 2030",
        market_drivers: [
          "Corporate net-zero commitments",
          "Government incentives and regulations",
          "Investor pressure for ESG performance"
        ]
      },
      investment_thesis: {
        strengths: [
          "Technology leadership with proven efficiency advantages",
          "Strong management team with technical and policy expertise",
          "Favorable regulatory environment creating tailwinds"
        ],
        risks: [
          "Technology deployment scaling challenges",
          "Potential policy changes with election cycles",
          "Competition from emerging direct air capture technologies"
        ],
        valuation_analysis: {
          current_market_cap: "Approximately $1.8B based on public trading",
          comparable_companies: "Trading at 6.5x revenue, slightly above industry average (5.8x)",
          upside_potential: "25-40% upside if growth trajectory maintained and policy support continues"
        }
      },
      strategic_recommendations: [
        "Consider long position with 2-3 year investment horizon to capture regulatory tailwinds",
        "Monitor quarterly deployment metrics as key indicator of scaling success",
        "Watch for expansion announcements into international markets, particularly EU and China"
      ]
    }
  },
  {
    id: 'vert_analysis_3',
    user_id: MOCK_USER_ID,
    horizontal_data_id: 'horiz_contact_1',
    analysis_type: 'Expert Profile Analysis',
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
    agent_config: {
      agents: ['Talent Specialist', 'AI Domain Expert', 'Network Analyst'],
      depth: 'detailed',
      focus_areas: ['expertise validation', 'influence assessment', 'collaboration potential']
    },
    metadata: {
      duration: '2.8 minutes',
      token_usage: 9800,
      confidence_score: 0.94
    },
    analysis_results: {
      executive_summary: "Dr. Alex Rivera is a highly credible AI expert with specialized knowledge in explainable AI and AI ethics. With significant academic credentials, industry experience, and thought leadership, he represents a valuable potential advisor, partner, or industry connection.",
      expertise_assessment: {
        core_strengths: [
          "Explainable AI methodologies and implementation",
          "AI ethics frameworks and governance",
          "Enterprise AI deployment strategies"
        ],
        knowledge_depth: "Deep technical expertise combined with practical implementation experience",
        unique_perspective: "Bridges academic research with enterprise application, particularly in regulated industries"
      },
      influence_analysis: {
        thought_leadership: {
          publication_impact: "Highly cited papers in AI ethics (124 citations) indicate significant academic influence",
          speaking_engagements: "Regular presenter at premier industry events (AI Summit, TechCrunch Disrupt)",
          social_presence: "28,000 followers across platforms indicates strong industry influence"
        },
        network_strength: {
          key_connections: [
            "Former Google colleague now AI Director at Microsoft",
            "Research collaboration with Stanford AI Lab",
            "Advisory role with AI Ethics Committee"
          ],
          organizational_influence: "As CAO, likely has significant decision-making authority for AI strategy and vendor selection"
        }
      },
      engagement_opportunities: {
        potential_roles: [
          "Technical advisor for product development",
          "Potential customer/partner through TechNova Solutions",
          "Speaker for thought leadership events"
        ],
        approach_strategy: {
          recommended_channels: "LinkedIn or direct email, referencing recent publication",
          conversation_starters: [
            "Thoughts on recent paper about explainable AI in healthcare",
            "Perspective on balancing innovation with ethical considerations",
            "Experience implementing AI governance frameworks"
          ],
          value_proposition: "Focus on mutual interest in advancing responsible AI adoption in enterprise settings"
        }
      },
      additional_insights: [
        "Publication history suggests strong interest in healthcare AI applications",
        "Career progression indicates preference for innovative companies with strong ethical foundations",
        "Speaking topics suggest concern about responsible AI deployment at scale"
      ]
    }
  },
  {
    id: 'vert_analysis_4',
    user_id: MOCK_USER_ID,
    horizontal_data_id: 'horiz_comp_3',
    analysis_type: 'Competitive Landscape Analysis',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    status: 'completed',
    agent_config: {
      agents: ['Industry Analyst', 'Healthcare Specialist', 'Technology Strategist'],
      depth: 'comprehensive',
      focus_areas: ['competitive positioning', 'technology differentiation', 'market dynamics']
    },
    metadata: {
      duration: '3.9 minutes',
      token_usage: 13200,
      confidence_score: 0.87
    },
    analysis_results: {
      executive_summary: "HealthSync is rapidly gaining traction in the competitive healthcare AI market with its diagnostic tools. Recent FDA clearance represents a significant milestone that will accelerate adoption. The company faces competition from established players but has technology advantages and strong growth momentum.",
      market_landscape: {
        market_size: "$15.8B global healthcare AI market, growing at 38% CAGR",
        key_players: [
          { name: "MedAI Systems", strengths: "Market leader, extensive hospital relationships", weaknesses: "Aging technology stack, slow innovation cycle" },
          { name: "DiagnosticAI", strengths: "Strong radiology focus, research partnerships", weaknesses: "Limited product range, resource constraints" },
          { name: "HealthTech Solutions", strengths: "Comprehensive platform, strong sales team", weaknesses: "Less specialized, accuracy challenges in some specialties" }
        ],
        market_segmentation: {
          diagnostic_tools: "Largest segment (42% of market), highest growth rate",
          patient_monitoring: "Rapidly growing segment (28% of market), driven by remote care trends",
          administrative_ai: "Established segment (30% of market), moderate growth"
        }
      },
      competitive_positioning: {
        healthsync_advantages: [
          "Recent FDA clearance provides regulatory validation",
          "65% YoY growth outpaces all major competitors",
          "Strong technical team led by Dr. Lisa Patel (former NIH researcher)"
        ],
        healthsync_challenges: [
          "Smaller sales and implementation team compared to established players",
          "Limited international presence",
          "Narrower product portfolio than comprehensive platform providers"
        ],
        differentiation_analysis: "HealthSync's diagnostic accuracy (40% improvement in recent study) represents significant differentiation in a market where marginal improvements are typical"
      },
      strategic_implications: {
        market_entry_strategy: "HealthSync's FDA clearance creates immediate opportunity for market entry in radiology diagnostics",
        competitive_response: "Expect aggressive competitive responses from incumbents, potentially including acquisition offers",
        partnership_opportunities: "HealthSync's technology strength combined with a larger player's distribution could create formidable market presence"
      },
      forecast_and_recommendations: {
        market_projection: "HealthSync likely to reach 12-15% market share within 24 months based on current trajectory",
        key_indicators_to_monitor: [
          "Hospital adoption rate following FDA clearance",
          "Expansion into additional diagnostic specialties",
          "Key executive retention during growth phase"
        ],
        strategic_options: [
          "Potential acquisition target for healthcare IT leaders",
          "Partnership opportunities with medical imaging companies",
          "International expansion through regional distribution partners"
        ]
      }
    }
  }
];

// Helper functions to get mock data
export const getMockHorizontalData = () => mockHorizontalData;
export const getMockVerticalAnalysis = () => mockVerticalAnalysis;

// Get specific items by ID
export const getHorizontalItemById = (id: string) => 
  mockHorizontalData.find(item => item.id === id) || null;

export const getVerticalItemById = (id: string) => 
  mockVerticalAnalysis.find(item => item.id === id) || null;

// Get related vertical analyses for a horizontal item
export const getRelatedVerticalAnalyses = (horizontalId: string) =>
  mockVerticalAnalysis.filter(item => item.horizontal_data_id === horizontalId);

// Get horizontal item for a vertical analysis
export const getParentHorizontalItem = (verticalId: string) => {
  const analysis = mockVerticalAnalysis.find(item => item.id === verticalId);
  if (!analysis) return null;
  return mockHorizontalData.find(item => item.id === analysis.horizontal_data_id) || null;
};
