import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Volume2, 
  Maximize2, 
  RotateCcw,
  BookOpen,
  Share2,
  Tv,
  ListVideo
} from 'lucide-react';

interface StudentVideoLessonPlayerProps {
  planId: string;
  planNumber: number;
  planName: string;
  onVideoWatched?: () => void;
}

interface VideoLesson {
  id: string;
  title: string;
  duration: string;
  level: string;
  description: string;
  isOfficialGoogleFlow?: boolean;
  videoUrl?: string;
  thumbnail: string;
  keyPoints: string[];
}

const FLOW_GOOGLE_VIDEO_URL = 'https://flow.google.com/shared/video/52fc05e3-5a11-4930-9a32-34ea84151637';

const PLAN_VIDEOS: Record<string, VideoLesson[]> = {
  'plan-01': [
    {
      id: 'flow-google-overview',
      title: 'आधिकारिक विशेष वीडियो: डिजिटल शिक्षा व स्मार्ट स्टडी गाइड (Google Flow)',
      duration: '12:45 मिनट',
      level: 'कक्षा 1 से 5',
      description: 'आधिकारिक Google Flow वीडियो सेशन जिसमें डिजिटल तकनीक, दृश्य शिक्षा और पाठों को सरलता से समझने का तरीका समझाया गया है।',
      isOfficialGoogleFlow: true,
      videoUrl: FLOW_GOOGLE_VIDEO_URL,
      thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
      keyPoints: [
        'विजुअल एनीमेशन के माध्यम से अक्षरों की पहचान',
        'ध्वनि (Phonics) व सही उच्चारण का अभ्यास',
        'घर बैठे आसान व रोचक अध्ययन विधि'
      ]
    },
    {
      id: 'hindi-varnamala-recitation',
      title: 'हिंदी वर्णमाला: स्वर (अ से अः) सचित्र गान व उच्चारण',
      duration: '15:20 मिनट',
      level: 'Class 1-2',
      description: 'अ से अनार, आ से आम के साथ बच्चों के लिए संगीतमय और रोचक वर्णमाला वीडियो पाठ।',
      thumbnail: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      keyPoints: [
        '11 स्वर और 2 अयोगवाह का शुद्ध उच्चारण',
        'प्रत्येक अक्षर से जुड़े दैनिक चित्र',
        'बाल गीत व लयबद्ध स्मरण'
      ]
    },
    {
      id: 'math-tables-fun',
      title: 'गणित: 1 से 20 तक पहाड़ा (Tables) सीखने की जादुई ट्रिक',
      duration: '18:10 मिनट',
      level: 'Class 2-4',
      description: 'गिनती और पहाड़ा याद करने की आसान उंगलियों की ट्रिक और जोड़-घटाव का सचित्र निरूपण।',
      thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      keyPoints: [
        '2 से 10 तक पहाड़ा बिना रटे याद करना',
        'सचित्र जोड़ और घटाना के उदाहरण',
        'दैनिक जीवन में पैसों का लेन-देन'
      ]
    }
  ],
  'plan-02': [
    {
      id: 'flow-google-overview',
      title: 'आधिकारिक विशेष वीडियो: आधुनिक डिजिटल व AI कौशल (Google Flow)',
      duration: '12:45 मिनट',
      level: 'युवा व मिडिल स्कूल',
      description: 'Google Flow के सहयोग से प्रस्तुत आधुनिक डिजिटल लर्निंग वीडियो, जिसमें AI और कंप्यूटर कौशल की उपयोगिता बताई गई है।',
      isOfficialGoogleFlow: true,
      videoUrl: FLOW_GOOGLE_VIDEO_URL,
      thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      keyPoints: ['डिजिटल वर्कफ़्लो का निर्माण', 'एआई प्रॉम्प्ट्स और ऑटोमेशन', 'छात्रों के लिए स्मार्ट उत्पादकता']
    },
    {
      id: 'computer-basics-mastery',
      title: 'कंप्यूटर फंडामेंटल: हार्डवेयर, सॉफ्टवेयर व 50 शॉर्टकट्स',
      duration: '22:30 मिनट',
      level: 'Class 6-8 + Fresher',
      description: 'कीबोर्ड शॉर्टकट्स, फाइल मैनेजमेंट और एमएस वर्ड/एक्सेल बेसिक्स का लाइव स्क्रीन रिकॉर्डेड वॉकथ्रू।',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      keyPoints: ['Ctrl+C, Ctrl+V, Alt+Tab जैसे जरूरी शॉर्टकट', 'सुरक्षित इंटरनेट ब्राउज़िंग', 'डिजिटल फाइलें व्यवस्थित करना']
    }
  ],
  'plan-03': [
    {
      id: 'flow-google-overview',
      title: 'आधिकारिक विशेष वीडियो: करियर ग्रोथ व कम्युनिकेशन (Google Flow)',
      duration: '12:45 मिनट',
      level: 'करियर व कॉलेज छात्र',
      description: 'करियर निर्माण और प्रस्तुतीकरण में डिजिटल तकनीकों की उपयोगिता पर आधिकारिक Google Flow वीडियो।',
      isOfficialGoogleFlow: true,
      videoUrl: FLOW_GOOGLE_VIDEO_URL,
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
      keyPoints: ['कॉन्फिडेंट कम्युनिकेशन स्किल्स', 'डिजिटल पोर्टफोलियो प्रस्तुति', 'इंटरव्यू में प्रभाव छोड़ने की तकनीक']
    },
    {
      id: 'spoken-english-self-intro',
      title: 'स्पोकन इंग्लिश: 5 मिनट में प्रभावशाली Self Introduction कैसे दें',
      duration: '19:40 मिनट',
      level: 'Class 9-10 & College',
      description: 'बिना हिचकिचाहट अंग्रेजी बोलने के 10 गोल्डन नियम, सही बॉडी लैंग्वेज और कॉमन इंटरव्यू प्रश्नोत्तर।',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      keyPoints: ['नमस्ते और ग्रीट करने का सही तरीका', 'एजुकेशन और स्किल्स को हाइलाइट करना', 'झिझक दूर करने के दैनिक अभ्यास']
    }
  ],
  'plan-04': [
    {
      id: 'flow-google-overview',
      title: 'आधिकारिक विशेष वीडियो: संपूर्ण परिवार व छात्र शिक्षा (Google Flow)',
      duration: '12:45 मिनट',
      level: 'पारिवारिक एवं सामान्य',
      description: 'डिजिटल तकनीक से पूरे परिवार को शिक्षित और जागरूक करने की रूपरेखा।',
      isOfficialGoogleFlow: true,
      videoUrl: FLOW_GOOGLE_VIDEO_URL,
      thumbnail: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
      keyPoints: ['पारिवारिक डिजिटल साक्षरता', 'ऑनलाइन वित्तीय सुरक्षा', 'दैनिक सामान्य ज्ञान']
    },
    {
      id: 'gk-science-everyday',
      title: 'दैनिक जीवन का सामान्य ज्ञान व घरेलू वित्तीय समझ',
      duration: '16:15 मिनट',
      level: 'Class 11-12 & Family',
      description: 'बैंकिंग, यूपीआई सुरक्षा, सरकारी कल्याणकारी योजनाओं और व्यावहारिक स्वास्थ्य टिप्स पर सचित्र वीडियो।',
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
      keyPoints: ['यूपीआई फ्रॉड से बचने के 5 नियम', 'बचत और बैंक ब्याज का हिसाब', 'सामान्य विज्ञान के घरेलू नियम']
    }
  ],
  'plan-05': [
    {
      id: 'flow-google-overview',
      title: 'आधिकारिक विशेष वीडियो: बोर्ड परीक्षा व कॉम्पिटिशन रणनीति (Google Flow)',
      duration: '12:45 मिनट',
      level: '10वीं / 12वीं बोर्ड व प्रतियोगी',
      description: 'परीक्षा की तैयारी, रिवीजन साइकल और उच्च अंक अर्जित करने की मनोवैज्ञानिक तकनीक।',
      isOfficialGoogleFlow: true,
      videoUrl: FLOW_GOOGLE_VIDEO_URL,
      thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
      keyPoints: ['स्मार्ट स्टडी टाइम मैनेजमेंट', 'रिवीजन साइकल और माइंड मैपिंग', 'परीक्षा हॉल में तनाव मुक्त रहने के उपाय']
    },
    {
      id: 'board-exam-math-science',
      title: 'बोर्ड परीक्षा में 90%+ अंक लाने का सटीक रोडमैप व मॉडल पेपर्स',
      duration: '28:50 मिनट',
      level: 'Board Aspirants',
      description: 'उत्तर पुस्तिका में स्टेप-बाय-स्टेप लिखने का तरीका और कठिन फॉर्मूलों को याद रखने की तकनीक।',
      thumbnail: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80',
      keyPoints: ['स्टेप-मार्किंग का सही उपयोग', 'गणित में रफ वर्क और समय प्रबंधन', 'डायग्राम्स से अधिक अंक कैसे प्राप्त करें']
    }
  ],
  'plan-06': [
    {
      id: 'flow-google-overview',
      title: 'आधिकारिक विशेष वीडियो: डिजिटल सर्विस व ऑनलाइन पोर्टल गाइड (Google Flow)',
      duration: '12:45 मिनट',
      level: 'डिजिटल उद्यमी व छात्र',
      description: 'डिजिटल सेवाओं के संचालन, ऑनलाइन फॉर्म्स और सरकारी पोर्टलों के प्रबंधन का आधिकारिक वीडियो।',
      isOfficialGoogleFlow: true,
      videoUrl: FLOW_GOOGLE_VIDEO_URL,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      keyPoints: ['ऑनलाइन डिजिटल केंद्र संचालन', 'सरकारी पोर्टलों पर निर्बाध आवेदन', 'क्लाइंट रिकॉर्ड व सुरक्षा']
    },
    {
      id: 'rtps-online-services',
      title: 'RTPS बिहार व केंद्रीय सरकारी पोर्टल: जाति, आय, निवास व दाखिल खारिज',
      duration: '24:10 मिनट',
      level: 'Agency Specialist',
      description: 'बिना गलती किए ऑनलाइन फॉर्म भरने, स्टेटस ट्रैक करने और सर्टिफिकेट डाउनलोड करने की पूरी विधि।',
      thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
      keyPoints: ['दस्तावेज सही साइज में स्कैन व अपलोड करना', 'रेफरेंस नंबर से ट्रैकिंग', 'तत्काल रसीद प्रिंटिंग']
    }
  ],
  'plan-07': [
    {
      id: 'flow-google-overview',
      title: 'आधिकारिक विशेष वीडियो: सुप्रीम मास्टर ऑल-इन-वन गाइड (Google Flow)',
      duration: '12:45 मिनट',
      level: 'मास्टर ऑल-इन-वन',
      description: 'संपूर्ण 7 प्लांस, डिजिटल स्वावलंबन और मेंटरशिप नेटवर्क का आधिकारिक विहंगावलोकन।',
      isOfficialGoogleFlow: true,
      videoUrl: FLOW_GOOGLE_VIDEO_URL,
      thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
      keyPoints: ['सभी 7 प्लांस का एकीकृत उपयोग', 'लीडरशिप और टीम समन्वय', 'डिजिटल भारत में आत्मनिर्भरता']
    },
    {
      id: 'master-leadership-roadmap',
      title: 'डिजिटल स्वावलंबन मास्टरक्लास: ₹10 से ₹999 तक का 360° रोडमैप',
      duration: '31:20 मिनट',
      level: 'Supreme Master Council',
      description: 'टीम निर्माण, दैनिक इंसेंटिव और शिक्षा व स्वावलंबन को गांव-गांव पहुंचाने की मास्टर रणनीति।',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
      keyPoints: ['सामुदायिक डिजिटल साक्षरता मिशन', 'दैनिक कार्ययोजना व समय प्रबंधन', 'दीर्घकालिक सफलता के सूत्र']
    }
  ]
};

export const StudentVideoLessonPlayer: React.FC<StudentVideoLessonPlayerProps> = ({
  planId,
  planNumber,
  planName,
  onVideoWatched
}) => {
  const videoList = PLAN_VIDEOS[planId] || PLAN_VIDEOS['plan-01'];
  const [selectedVideo, setSelectedVideo] = useState<VideoLesson>(videoList[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [watchedVideos, setWatchedVideos] = useState<Record<string, boolean>>({});
  const [playbackSpeed, setPlaybackSpeed] = useState<string>('1.0x');
  const [studentNote, setStudentNote] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMarkWatched = () => {
    setWatchedVideos(prev => ({ ...prev, [selectedVideo.id]: true }));
    if (onVideoWatched) {
      onVideoWatched();
    }
  };

  const handleSaveNote = () => {
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2500);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-red-100 text-red-600">
            <Tv className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
              PLAN 0{planNumber} • वीडियो कक्षाएं
            </span>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
              इंटरएक्टिव वीडियो लेक्चर्स एवं विजुअल कक्षाएं
            </h3>
          </div>
        </div>

        {/* Video selector dropdown on mobile / small screen */}
        <div className="flex items-center gap-2">
          <ListVideo className="w-4 h-4 text-slate-500" />
          <select
            value={selectedVideo.id}
            onChange={(e) => {
              const f = videoList.find(v => v.id === e.target.value);
              if (f) setSelectedVideo(f);
            }}
            className="text-xs font-bold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {videoList.map(v => (
              <option key={v.id} value={v.id}>
                {v.isOfficialGoogleFlow ? '⭐ [Official Flow] ' : ''}{v.title.slice(0, 38)}...
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Video Presentation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Player Box */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Video Container Box */}
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl group">
            
            {/* Background Thumbnail Image */}
            <img 
              src={selectedVideo.thumbnail} 
              alt={selectedVideo.title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isPlaying ? 'opacity-30' : 'opacity-80'
              }`}
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />

            {/* Official Google Flow Tag if applicable */}
            {selectedVideo.isOfficialGoogleFlow && (
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1.5 rounded-full text-xs font-black shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Google Flow Official Shared Video</span>
              </div>
            )}

            {/* Duration Tag */}
            <div className="absolute top-4 right-4 z-20 bg-slate-950/80 backdrop-blur-md text-white text-xs font-mono font-bold px-2.5 py-1 rounded-lg border border-white/20">
              {selectedVideo.duration}
            </div>

            {/* Center Play Button Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10">
              <button
                type="button"
                onClick={handlePlayToggle}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white shadow-2xl transition-all transform hover:scale-110 active:scale-95 ${
                  isPlaying 
                    ? 'bg-amber-600 hover:bg-amber-700' 
                    : 'bg-red-600 hover:bg-red-700 ring-4 ring-red-500/30 ring-offset-4 ring-offset-slate-950'
                }`}
              >
                {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
              </button>

              <p className="text-white font-extrabold text-sm sm:text-base mt-3 max-w-md drop-shadow">
                {selectedVideo.title}
              </p>
              
              {isPlaying ? (
                <span className="text-xs text-amber-300 font-mono mt-1 animate-pulse">
                  ● वीडियो चल रहा है (Playing Lesson)
                </span>
              ) : (
                <span className="text-xs text-slate-300 mt-1">
                  क्लिक करके क्लास शुरू करें
                </span>
              )}
            </div>

            {/* Official Google Flow Direct Link Button */}
            {selectedVideo.isOfficialGoogleFlow && (
              <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                <div className="text-xs text-slate-200 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Google Flow Shared Player: 52fc05e3-5a11-4930-9a32-34ea84151637</span>
                </div>
                <a
                  href={FLOW_GOOGLE_VIDEO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition-transform hover:scale-105"
                >
                  <span>मूल वीडियो नई विंडो में खोलें</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

          </div>

          {/* Player Controls Bar */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">प्लेबैक स्पीड:</span>
              {['0.75x', '1.0x', '1.25x', '1.5x'].map(spd => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    playbackSpeed === spd
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {spd}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleMarkWatched}
                className={`px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                  watchedVideos[selectedVideo.id]
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-100'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{watchedVideos[selectedVideo.id] ? '✓ पाठ देखा गया' : 'देखा गया चिह्नित करें'}</span>
              </button>
            </div>

          </div>

          {/* Key Learning Highlights */}
          <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200/80 space-y-2">
            <h4 className="font-black text-xs text-orange-950 uppercase tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span>इस वीडियो पाठ के मुख्य बिंदु (Key Takeaways):</span>
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-orange-950">
              {selectedVideo.keyPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-orange-600 font-bold shrink-0">✓</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Right 1 Col: Video Playlist & Student Scratchpad */}
        <div className="space-y-4">
          
          {/* Playlist */}
          <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200 space-y-3">
            <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider flex items-center justify-between">
              <span>पाठ सूची (Playlist - {videoList.length})</span>
              <span className="text-orange-600 font-bold">Plan 0{planNumber}</span>
            </h4>

            <div className="space-y-2">
              {videoList.map((v, i) => {
                const isCurrent = v.id === selectedVideo.id;
                const isWatched = watchedVideos[v.id];
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => {
                      setSelectedVideo(v);
                      setIsPlaying(true);
                    }}
                    className={`w-full p-3 rounded-2xl text-left border transition-all flex items-start gap-3 ${
                      isCurrent
                        ? 'bg-white border-orange-500 shadow-md ring-2 ring-orange-500/20'
                        : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 font-bold text-xs text-slate-700">
                      {isWatched ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        `0${i + 1}`
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        {v.isOfficialGoogleFlow && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-blue-100 text-blue-800">
                            Flow
                          </span>
                        )}
                        <span className="text-[10px] text-slate-500 font-mono">
                          {v.duration}
                        </span>
                      </div>
                      <h5 className="font-extrabold text-xs text-slate-900 truncate mt-0.5">
                        {v.title}
                      </h5>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Student Scratchpad while watching */}
          <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-xs text-slate-800 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-purple-600" />
                <span>वीडियो देखते समय नोट्स बनाएं</span>
              </h4>
              {noteSaved && (
                <span className="text-[11px] font-bold text-emerald-600 animate-in fade-in">
                  ✓ सुरक्षित!
                </span>
              )}
            </div>

            <textarea
              rows={4}
              value={studentNote}
              onChange={(e) => setStudentNote(e.target.value)}
              placeholder="इस वीडियो से सीखी गई मुख्य बातें यहाँ टाइप करें..."
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            />

            <button
              type="button"
              onClick={handleSaveNote}
              className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow transition-colors"
            >
              नोट्स सेव करें
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
