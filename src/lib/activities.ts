export interface Activity {
  id: string;
  category: 'adventure' | 'coastal' | 'foodie' | 'heritage' | 'hidden' | 'culture';
  emoji: string;
  title: string;
  location: string;
  duration: string;
  description: string;
  localSecret: string;
  bestTime?: 'dawn' | 'morning' | 'afternoon' | 'sunset' | 'night';
  difficulty?: 'easy' | 'moderate' | 'challenging';
}

export const activities: Activity[] = [
  // Adventure Activities
  {
    id: 'cliff-walk-1',
    category: 'adventure',
    emoji: '🥾',
    title: 'Cliff Walk to Helvick Head',
    location: 'Helvick Head',
    duration: '2-3 hours',
    description: 'Dramatic clifftop walk with breathtaking Atlantic views and ancient lighthouse.',
    localSecret: 'Best whale watching spot in Waterford - bring binoculars!',
    bestTime: 'morning',
    difficulty: 'moderate'
  },
  {
    id: 'kayak-1',
    category: 'adventure',
    emoji: '🛶',
    title: 'Sea Kayaking Dungarvan Bay',
    location: 'Dungarvan Harbour',
    duration: '2 hours',
    description: 'Paddle through crystal clear waters exploring hidden coves and sea caves.',
    localSecret: 'Seals often follow kayakers - they\'re curious and friendly!',
    bestTime: 'morning',
    difficulty: 'easy'
  },
  {
    id: 'cycle-1',
    category: 'adventure',
    emoji: '🚴',
    title: 'Waterford Greenway',
    location: 'Dungarvan to Kilmacthomas',
    duration: '3-4 hours',
    description: 'Scenic 46km cycle route through tunnels, over viaducts, and past stunning countryside.',
    localSecret: 'Stop at Ballyvoyle Tunnel - it\'s perfectly straight and you can see daylight at both ends!',
    bestTime: 'morning',
    difficulty: 'easy'
  },
  {
    id: 'surf-1',
    category: 'adventure',
    emoji: '🏄',
    title: 'Surfing at Clonea Strand',
    location: 'Clonea Beach',
    duration: '2-3 hours',
    description: 'Learn to surf on one of Ireland\'s most beautiful Blue Flag beaches.',
    localSecret: 'Best waves are 2 hours before high tide - check the surf report!',
    bestTime: 'morning',
    difficulty: 'moderate'
  },
  {
    id: 'hike-1',
    category: 'adventure',
    emoji: '⛰️',
    title: 'Comeragh Mountains Hike',
    location: 'Comeragh Mountains',
    duration: '4-6 hours',
    description: 'Challenging mountain hike with glacial lakes and panoramic views.',
    localSecret: 'Coumshingaun Lake is one of Ireland\'s most photographed corrie lakes.',
    bestTime: 'morning',
    difficulty: 'challenging'
  },

  // Coastal Activities
  {
    id: 'beach-1',
    category: 'coastal',
    emoji: '🏖️',
    title: 'Clonea Beach Sunset',
    location: 'Clonea Strand',
    duration: '1-2 hours',
    description: 'Watch the sun set over the Atlantic from this pristine Blue Flag beach.',
    localSecret: 'The beach extends for 3km - walk to the far end for complete solitude.',
    bestTime: 'sunset',
    difficulty: 'easy'
  },
  {
    id: 'fishing-1',
    category: 'coastal',
    emoji: '🎣',
    title: 'Sea Angling from the Pier',
    location: 'Dungarvan Pier',
    duration: '3-4 hours',
    description: 'Try your luck fishing for mackerel, whiting, and sea bass.',
    localSecret: 'Early morning high tide is best - locals say the fish bite before breakfast!',
    bestTime: 'dawn',
    difficulty: 'easy'
  },
  {
    id: 'lighthouse-1',
    category: 'coastal',
    emoji: '🗼',
    title: 'Helvick Head Lighthouse',
    location: 'Helvick Head',
    duration: '1 hour',
    description: 'Visit the iconic lighthouse and enjoy 360-degree coastal views.',
    localSecret: 'The lighthouse keeper\'s house is now a holiday rental - book ahead!',
    bestTime: 'afternoon',
    difficulty: 'easy'
  },
  {
    id: 'rockpool-1',
    category: 'coastal',
    emoji: '🦀',
    title: 'Rock Pool Exploration',
    location: 'Stradbally Cove',
    duration: '1-2 hours',
    description: 'Discover crabs, anemones, and starfish in natural rock pools.',
    localSecret: 'Best at low tide - check tide times and bring a bucket for kids!',
    bestTime: 'morning',
    difficulty: 'easy'
  },
  {
    id: 'boat-1',
    category: 'coastal',
    emoji: '⛵',
    title: 'Sailing Lesson',
    location: 'Dungarvan Sailing Club',
    duration: '2-3 hours',
    description: 'Learn to sail in the sheltered waters of Dungarvan Bay.',
    localSecret: 'The club has been running since 1969 - ask about their racing calendar!',
    bestTime: 'afternoon',
    difficulty: 'moderate'
  },

  // Foodie Activities
  {
    id: 'market-1',
    category: 'foodie',
    emoji: '🥕',
    title: 'Dungarvan Farmers Market',
    location: 'Grattan Square',
    duration: '1-2 hours',
    description: 'Sample local produce, artisan breads, and homemade preserves.',
    localSecret: 'Mary\'s brown bread sells out by 11am - get there early!',
    bestTime: 'morning',
    difficulty: 'easy'
  },
  {
    id: 'brewery-1',
    category: 'foodie',
    emoji: '🍺',
    title: 'Dungarvan Brewing Company',
    location: 'Dungarvan Town',
    duration: '1-2 hours',
    description: 'Tour the brewery and taste award-winning craft beers.',
    localSecret: 'Their Copper Coast Red Ale won gold at the World Beer Awards!',
    bestTime: 'afternoon',
    difficulty: 'easy'
  },
  {
    id: 'foraging-1',
    category: 'foodie',
    emoji: '🍄',
    title: 'Seaweed Foraging',
    location: 'Ballinacourty Beach',
    duration: '2-3 hours',
    description: 'Learn to identify and harvest edible seaweeds with a local expert.',
    localSecret: 'Dulse tastes like bacon when dried - perfect for vegetarians!',
    bestTime: 'morning',
    difficulty: 'easy'
  },
  {
    id: 'cooking-1',
    category: 'foodie',
    emoji: '👨‍🍳',
    title: 'Seafood Cooking Class',
    location: 'Tannery Cookery School',
    duration: '3-4 hours',
    description: 'Learn to prepare fresh local seafood with professional chefs.',
    localSecret: 'Paul Flynn sources fish directly from Helvick - it doesn\'t get fresher!',
    bestTime: 'afternoon',
    difficulty: 'moderate'
  },
  {
    id: 'distillery-1',
    category: 'foodie',
    emoji: '🥃',
    title: 'Blackwater Distillery Tour',
    location: 'Ballyduff Upper',
    duration: '1-2 hours',
    description: 'Discover the art of Irish whiskey making and enjoy tastings.',
    localSecret: 'Their gin is made with local botanicals including gorse flowers!',
    bestTime: 'afternoon',
    difficulty: 'easy'
  },

  // Heritage Activities
  {
    id: 'castle-1',
    category: 'heritage',
    emoji: '🏰',
    title: 'Dungarvan Castle',
    location: 'Dungarvan Town Centre',
    duration: '1-2 hours',
    description: 'Explore the 12th-century Norman castle and its fascinating history.',
    localSecret: 'The castle was once used as a police barracks - look for the old cells!',
    bestTime: 'afternoon',
    difficulty: 'easy'
  },
  {
    id: 'abbey-1',
    category: 'heritage',
    emoji: '⛪',
    title: 'Ardmore Round Tower',
    location: 'Ardmore Village',
    duration: '1-2 hours',
    description: 'Visit the 12th-century round tower and ancient cathedral ruins.',
    localSecret: 'St. Declan arrived here before St. Patrick - making it Ireland\'s oldest Christian settlement!',
    bestTime: 'morning',
    difficulty: 'easy'
  },
  {
    id: 'museum-1',
    category: 'heritage',
    emoji: '🏛️',
    title: 'Dungarvan Museum',
    location: 'Dungarvan Town',
    duration: '1-2 hours',
    description: 'Discover local maritime history and shipwreck artifacts.',
    localSecret: 'The museum has artifacts from the Samson shipwreck of 1760!',
    bestTime: 'afternoon',
    difficulty: 'easy'
  },
  {
    id: 'ogham-1',
    category: 'heritage',
    emoji: '🗿',
    title: 'Ogham Stone Trail',
    location: 'Ardmore to Clashmore',
    duration: '2-3 hours',
    description: 'Follow ancient Ogham stones marking early Christian sites.',
    localSecret: 'The stones are written in Ireland\'s oldest form of writing - like ancient Irish hieroglyphs!',
    bestTime: 'morning',
    difficulty: 'moderate'
  },
  {
    id: 'famine-1',
    category: 'heritage',
    emoji: '🛤️',
    title: 'Famine Village Walk',
    location: 'Stradbally',
    duration: '2-3 hours',
    description: 'Walk through the ruins of a village abandoned during the Great Famine.',
    localSecret: 'You can still see the potato ridges in the fields - a haunting reminder of history.',
    bestTime: 'afternoon',
    difficulty: 'moderate'
  },

  // Hidden Gems
  {
    id: 'hidden-1',
    category: 'hidden',
    emoji: '💎',
    title: 'Secret Waterfall',
    location: 'Mahon Falls',
    duration: '2-3 hours',
    description: 'Hidden waterfall tucked away in the Comeragh Mountains.',
    localSecret: 'Park at the small lay-by and follow the sheep tracks - it\'s worth the climb!',
    bestTime: 'morning',
    difficulty: 'moderate'
  },
  {
    id: 'hidden-2',
    category: 'hidden',
    emoji: '🌊',
    title: 'Smugglers Cave',
    location: 'Bunmahon Beach',
    duration: '1-2 hours',
    description: 'Explore sea caves once used by smugglers in the 18th century.',
    localSecret: 'Only accessible at low tide - locals call it "The Cathedral" for its arched ceiling.',
    bestTime: 'afternoon',
    difficulty: 'moderate'
  },
  {
    id: 'hidden-3',
    category: 'hidden',
    emoji: '🦌',
    title: 'Deer Watching at Dawn',
    location: 'Colligan Wood',
    duration: '2-3 hours',
    description: 'Spot red deer in their natural habitat in this ancient woodland.',
    localSecret: 'Bring a thermos of tea and sit quietly by the stream - patience is rewarded!',
    bestTime: 'dawn',
    difficulty: 'easy'
  },
  {
    id: 'hidden-4',
    category: 'hidden',
    emoji: '🌸',
    title: 'Fairy Ring Forest',
    location: 'Knockmealdown Mountains',
    duration: '1-2 hours',
    description: 'Mystical forest clearing with natural fairy rings of mushrooms.',
    localSecret: 'Best after rain when the mushrooms appear - locals say make a wish!',
    bestTime: 'morning',
    difficulty: 'easy'
  },
  {
    id: 'hidden-5',
    category: 'hidden',
    emoji: '🏞️',
    title: 'Lost Valley Walk',
    location: 'Nire Valley',
    duration: '3-4 hours',
    description: 'Remote valley walk with ancient stone circles and mountain streams.',
    localSecret: 'The stone circle is 4,000 years old - older than Stonehenge!',
    bestTime: 'morning',
    difficulty: 'moderate'
  },

  // Culture Activities
  {
    id: 'culture-1',
    category: 'culture',
    emoji: '🎵',
    title: 'Traditional Music Session',
    location: 'Merry\'s Gastro Pub',
    duration: '2-3 hours',
    description: 'Join locals for an authentic Irish traditional music session.',
    localSecret: 'Sessions start around 9pm - bring an instrument or just listen and enjoy!',
    bestTime: 'night',
    difficulty: 'easy'
  },
  {
    id: 'culture-2',
    category: 'culture',
    emoji: '💃',
    title: 'Irish Dancing Class',
    location: 'Dungarvan Community Centre',
    duration: '1-2 hours',
    description: 'Learn traditional Irish dancing steps from local experts.',
    localSecret: 'The teacher competed in the World Championships - you\'re learning from the best!',
    bestTime: 'afternoon',
    difficulty: 'moderate'
  },
  {
    id: 'culture-3',
    category: 'culture',
    emoji: '🎨',
    title: 'Local Art Gallery Tour',
    location: 'Waterford County Museum',
    duration: '1-2 hours',
    description: 'Discover works by local artists inspired by the Copper Coast.',
    localSecret: 'Many pieces are for sale - support local artists and take home a memory!',
    bestTime: 'afternoon',
    difficulty: 'easy'
  },
  {
    id: 'culture-4',
    category: 'culture',
    emoji: '📚',
    title: 'Storytelling Evening',
    location: 'Dungarvan Library',
    duration: '1-2 hours',
    description: 'Listen to local folklore and legends told by master storytellers.',
    localSecret: 'Ask about the ghost of Dungarvan Castle - every local has a different version!',
    bestTime: 'night',
    difficulty: 'easy'
  },
  {
    id: 'culture-5',
    category: 'culture',
    emoji: '🎭',
    title: 'Theatre Performance',
    location: 'Friary College Theatre',
    duration: '2-3 hours',
    description: 'Enjoy performances by the acclaimed Dungarvan Drama Society.',
    localSecret: 'The theatre is in a converted 19th-century school - check the program for local productions!',
    bestTime: 'night',
    difficulty: 'easy'
  },

  // More Adventure
  {
    id: 'adventure-6',
    category: 'adventure',
    emoji: '🧗',
    title: 'Rock Climbing',
    location: 'Coumshingaun Cliffs',
    duration: '4-5 hours',
    description: 'Challenge yourself on some of Ireland\'s most dramatic cliff faces.',
    localSecret: 'Bring a guide - the rock is solid sandstone and perfect for beginners!',
    bestTime: 'morning',
    difficulty: 'challenging'
  },
  {
    id: 'adventure-7',
    category: 'adventure',
    emoji: '🏊',
    title: 'Wild Swimming',
    location: 'Clonea Beach',
    duration: '1-2 hours',
    description: 'Brave the Atlantic waters for an invigorating wild swim.',
    localSecret: 'The water is warmest in September - but locals swim year-round!',
    bestTime: 'morning',
    difficulty: 'moderate'
  },
  {
    id: 'adventure-8',
    category: 'adventure',
    emoji: '🪂',
    title: 'Paragliding',
    location: 'Knockmealdown Mountains',
    duration: '3-4 hours',
    description: 'Soar above the countryside with tandem paragliding flights.',
    localSecret: 'Best thermals are in the afternoon - you might spot eagles below you!',
    bestTime: 'afternoon',
    difficulty: 'challenging'
  },
  {
    id: 'adventure-9',
    category: 'adventure',
    emoji: '🏇',
    title: 'Horse Riding on Beach',
    location: 'Clonea Strand',
    duration: '2-3 hours',
    description: 'Gallop along the beach on horseback at sunset.',
    localSecret: 'The horses love the water - they\'ll splash through the waves!',
    bestTime: 'sunset',
    difficulty: 'moderate'
  },
  {
    id: 'adventure-10',
    category: 'adventure',
    emoji: '🎣',
    title: 'Deep Sea Fishing',
    location: 'Dungarvan Harbour',
    duration: '6-8 hours',
    description: 'Head out to sea for a full day of deep sea fishing.',
    localSecret: 'Captain Murphy knows where the big ones hide - book the early boat!',
    bestTime: 'dawn',
    difficulty: 'moderate'
  },

  // More Coastal
  {
    id: 'coastal-6',
    category: 'coastal',
    emoji: '🐋',
    title: 'Whale Watching',
    location: 'Helvick Head',
    duration: '2-3 hours',
    description: 'Spot whales, dolphins, and seals from the dramatic headland.',
    localSecret: 'Minke whales pass by in summer - bring binoculars and patience!',
    bestTime: 'morning',
    difficulty: 'easy'
  },
  {
    id: 'coastal-7',
    category: 'coastal',
    emoji: '🏄‍♀️',
    title: 'Stand-up Paddleboarding',
    location: 'Dungarvan Bay',
    duration: '2-3 hours',
    description: 'Glide across calm waters on a stand-up paddleboard.',
    localSecret: 'The bay is perfect for beginners - sheltered and usually calm!',
    bestTime: 'morning',
    difficulty: 'easy'
  },
  {
    id: 'coastal-8',
    category: 'coastal',
    emoji: '🦭',
    title: 'Seal Watching',
    location: 'Mine Head',
    duration: '1-2 hours',
    description: 'Watch grey seals basking on the rocks below the lighthouse.',
    localSecret: 'Best viewing is 2 hours before high tide when they haul out to rest.',
    bestTime: 'afternoon',
    difficulty: 'easy'
  },

  // More Foodie
  {
    id: 'foodie-6',
    category: 'foodie',
    emoji: '🦪',
    title: 'Oyster Tasting',
    location: 'Dungarvan Harbour',
    duration: '1-2 hours',
    description: 'Sample fresh oysters straight from Dungarvan Bay.',
    localSecret: 'The oysters are grown in the cleanest waters - they taste like the sea!',
    bestTime: 'afternoon',
    difficulty: 'easy'
  },
  {
    id: 'foodie-7',
    category: 'foodie',
    emoji: '🍯',
    title: 'Honey Farm Visit',
    location: 'Knockmealdown Foothills',
    duration: '1-2 hours',
    description: 'Learn about beekeeping and taste local wildflower honey.',
    localSecret: 'The heather honey is only available in August - it\'s like liquid gold!',
    bestTime: 'afternoon',
    difficulty: 'easy'
  },
  {
    id: 'foodie-8',
    category: 'foodie',
    emoji: '🧀',
    title: 'Artisan Cheese Making',
    location: 'Knockanore Farmhouse',
    duration: '3-4 hours',
    description: 'Learn traditional cheese making techniques from local artisans.',
    localSecret: 'Their smoked cheese is aged in turf smoke - you can taste the terroir!',
    bestTime: 'morning',
    difficulty: 'moderate'
  },
  {
    id: 'foodie-9',
    category: 'foodie',
    emoji: '🍷',
    title: 'Wine Tasting',
    location: 'Blackwater Valley Vineyard',
    duration: '2-3 hours',
    description: 'Taste wines made from grapes grown in Ireland\'s sunny southeast.',
    localSecret: 'The climate here is perfect for white wines - try the Riesling!',
    bestTime: 'afternoon',
    difficulty: 'easy'
  },
  {
    id: 'foodie-10',
    category: 'foodie',
    emoji: '🥧',
    title: 'Traditional Baking Class',
    location: 'Dungarvan Cookery School',
    duration: '3-4 hours',
    description: 'Learn to bake traditional Irish soda bread and apple tart.',
    localSecret: 'The secret is buttermilk and a hot oven - take home the recipes!',
    bestTime: 'morning',
    difficulty: 'easy'
  },

  // More Heritage
  {
    id: 'heritage-6',
    category: 'heritage',
    emoji: '⚓',
    title: 'Shipwreck Exploration',
    location: 'Ballinacourty Beach',
    duration: '2-3 hours',
    description: 'Explore the remains of ships wrecked on the Copper Coast.',
    localSecret: 'The SS Samson wreck is visible at low tide - 260 years underwater!',
    bestTime: 'afternoon',
    difficulty: 'moderate'
  },
  {
    id: 'heritage-7',
    category: 'heritage',
    emoji: '🏺',
    title: 'Archaeological Dig Experience',
    location: 'Ardmore Monastic Site',
    duration: '4-5 hours',
    description: 'Join archaeologists uncovering Ireland\'s early Christian heritage.',
    localSecret: 'They\'ve found 1,500-year-old artifacts - you might discover something!',
    bestTime: 'morning',
    difficulty: 'moderate'
  },
  {
    id: 'heritage-8',
    category: 'heritage',
    emoji: '🗡️',
    title: 'Viking Heritage Trail',
    location: 'Waterford City',
    duration: '3-4 hours',
    description: 'Follow the footsteps of Vikings through Ireland\'s oldest city.',
    localSecret: 'Waterford was founded by Vikings in 914 AD - older than Dublin!',
    bestTime: 'afternoon',
    difficulty: 'easy'
  }
];

export function getRandomActivities(count: number = 5): Activity[] {
  const shuffled = [...activities].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getActivityById(id: string): Activity | undefined {
  return activities.find(activity => activity.id === id);
}

export function getActivitiesByCategory(category: Activity['category']): Activity[] {
  return activities.filter(activity => activity.category === category);
}
