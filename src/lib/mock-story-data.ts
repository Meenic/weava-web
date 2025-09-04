import type { StoryData, StorySegment, Choice } from "@/types/story-types";

// Mock story database
const mockStories: Record<string, StoryData> = {
  "1": {
    metadata: {
      id: "1",
      title: "The Enchanted Forest",
      author: "AI Storyteller",
      genre: "Fantasy",
      estimatedTime: "15-20 min",
      description: "A magical adventure through an ancient forest filled with mystical creatures and hidden secrets."
    },
    currentSegment: {
      id: "start",
      text: "You stand at the edge of an ancient forest, its towering trees shrouded in mist. The path ahead splits into two directions: one leads deeper into the dark woods where strange lights flicker between the branches, while the other follows a babbling brook toward what appears to be a clearing bathed in golden sunlight.\n\nThe air is thick with magic, and you can feel the weight of countless stories that have unfolded in this place. Your heart races with anticipation as you realize that your choices will shape the adventure ahead.",
      choices: [
        {
          id: "dark_path",
          text: "Follow the mysterious lights into the dark woods",
          consequence: "Risk and mystery await in the shadows"
        },
        {
          id: "sunny_path",
          text: "Take the sunny path along the brook",
          consequence: "Safety and warmth, but perhaps fewer secrets"
        },
        {
          id: "investigate",
          text: "Examine the forest edge more carefully first",
          consequence: "Knowledge before action"
        }
      ]
    },
    history: []
  },
  "2": {
    metadata: {
      id: "2",
      title: "The Space Station Mystery",
      author: "AI Storyteller",
      genre: "Sci-Fi",
      estimatedTime: "20-25 min",
      description: "A thrilling mystery aboard a remote space station where nothing is as it seems."
    },
    currentSegment: {
      id: "start",
      text: "The emergency klaxon echoes through the corridors of Station Omega-7 as you float through the zero-gravity environment. Red warning lights cast eerie shadows on the metallic walls. You're the only crew member awake from cryosleep, and something has gone terribly wrong.\n\nThrough the observation deck's massive viewport, you can see Earth far below, a blue marble against the star-filled void. But your attention is drawn to the ship's AI system, which keeps repeating the same message: 'Critical system failure detected. Immediate action required.'\n\nYou have limited time before life support fails completely.",
      choices: [
        {
          id: "check_ai",
          text: "Investigate the AI core systems",
          consequence: "Uncover the truth behind the malfunction"
        },
        {
          id: "wake_crew",
          text: "Attempt to wake other crew members",
          consequence: "Safety in numbers, but uses precious power"
        },
        {
          id: "emergency_protocol",
          text: "Initiate emergency evacuation procedures",
          consequence: "Quick escape, but abandon the mission"
        }
      ]
    },
    history: []
  }
};

// Story progression trees
const storyTrees: Record<string, Record<string, StorySegment>> = {
  "1": {
    "dark_path": {
      id: "dark_path",
      text: "You venture into the shadowy depths of the forest, following the dancing lights that seem to beckon you forward. The air grows colder, and strange whispers echo from the trees. Suddenly, you come upon a clearing where a magnificent unicorn stands, its horn glowing with ethereal light.\n\nThe unicorn speaks in a voice like silver bells: 'Brave traveler, I have been waiting for someone pure of heart. The forest is in danger from a dark sorcerer who seeks to corrupt its magic. Will you help me stop him?'",
      choices: [
        {
          id: "help_unicorn",
          text: "Agree to help the unicorn",
          consequence: "Embark on a noble quest"
        },
        {
          id: "ask_questions",
          text: "Ask the unicorn more about the threat",
          consequence: "Gather information before deciding"
        },
        {
          id: "decline_politely",
          text: "Politely decline and continue exploring",
          consequence: "Maintain your independence"
        }
      ]
    },
    "sunny_path": {
      id: "sunny_path",
      text: "You follow the cheerful brook through dappled sunlight, feeling the warmth on your face. The path leads to a beautiful meadow where wildflowers dance in the breeze. In the center of the meadow stands a cottage with smoke curling from its chimney.\n\nAn elderly woman emerges, her eyes twinkling with kindness. 'Welcome, dear traveler! I am the Guardian of this meadow. I can offer you rest and refreshment, or perhaps you'd like to hear the ancient stories of this forest? But beware - not all who enter these woods have good intentions.'",
      choices: [
        {
          id: "accept_hospitality",
          text: "Accept her offer of rest and food",
          consequence: "Restore your strength for the journey ahead"
        },
        {
          id: "listen_stories",
          text: "Ask to hear the ancient stories",
          consequence: "Gain wisdom about the forest's secrets"
        },
        {
          id: "ask_about_danger",
          text: "Inquire about the dangers she mentioned",
          consequence: "Learn about potential threats"
        }
      ]
    },
    "investigate": {
      id: "investigate",
      text: "You decide to examine your surroundings more carefully before making any hasty decisions. As you study the forest edge, you notice strange symbols carved into the bark of several trees - they seem to pulse with a faint magical energy.\n\nSuddenly, you hear footsteps approaching. A hooded figure emerges from behind a large oak tree. 'I see you have the wisdom to observe before acting,' the figure says, lowering their hood to reveal an ancient elf with silver hair. 'I am Eldarin, keeper of forest lore. The symbols you see are warnings - this forest holds both great wonder and terrible danger.'",
      choices: [
        {
          id: "trust_elf",
          text: "Trust the elf and ask for guidance",
          consequence: "Gain a knowledgeable ally"
        },
        {
          id: "examine_symbols",
          text: "Ask about the meaning of the symbols",
          consequence: "Learn the forest's ancient secrets"
        },
        {
          id: "remain_cautious",
          text: "Thank them but remain cautious",
          consequence: "Maintain your independence but miss potential help"
        }
      ]
    },
    "help_unicorn": {
      id: "help_unicorn",
      text: "You pledge your aid to the noble unicorn, and immediately feel a warm glow surround you as the creature's magic enhances your courage and strength. 'Thank you, brave one,' the unicorn says. 'The dark sorcerer has built a tower at the heart of the forest. We must reach it before the next full moon, or his corruption will spread beyond these woods forever.'\n\nTogether, you and the unicorn set off deeper into the forest. The path ahead is treacherous, but you feel ready for whatever challenges await.",
      choices: [
        {
          id: "direct_approach",
          text: "Take the direct path to the tower",
          consequence: "Fast but dangerous route"
        },
        {
          id: "gather_allies",
          text: "Seek other forest creatures to help",
          consequence: "Build a stronger force but use more time"
        },
        {
          id: "scout_first",
          text: "Scout the tower's defenses first",
          consequence: "Gain tactical advantage"
        }
      ]
    },
    "direct_approach": {
      id: "direct_approach",
      text: "You and the unicorn charge directly toward the sorcerer's tower, a twisted spire of black stone that seems to drain the life from everything around it. As you approach, dark creatures emerge from the shadows - corrupted forest animals with glowing red eyes.\n\nThe unicorn's horn blazes with pure light, driving back the darkness. 'This is it!' the unicorn calls out. 'The final confrontation! Use the power I've shared with you!' You feel magical energy coursing through your veins as you face the sorcerer's minions.\n\nSuddenly, the sorcerer himself appears at the tower's peak, his voice booming across the forest: 'So, the forest sends champions against me! You are too late - my power is nearly complete!'",
      choices: [
        {
          id: "magical_duel",
          text: "Challenge the sorcerer to a magical duel",
          consequence: "Risk everything in direct confrontation"
        },
        {
          id: "destroy_tower",
          text: "Focus on destroying the source of his power",
          consequence: "Target the root of the problem"
        },
        {
          id: "unite_forest",
          text: "Call upon all forest creatures to unite against him",
          consequence: "Rally the entire forest to your cause"
        }
      ]
    },
    "unite_forest": {
      id: "unite_forest",
      text: "You raise your voice and call out to every living thing in the forest, channeling the unicorn's magic to amplify your words across every tree, stream, and meadow. The response is immediate and overwhelming.\n\nBirds fill the sky in great flocks, their songs creating a harmony that weakens the sorcerer's dark magic. Ancient trees uproot themselves and march toward the tower like gentle giants. Woodland creatures of every kind emerge from their homes - foxes, deer, bears, and even the shy forest spirits join the cause.\n\nThe sorcerer's expression changes from confidence to fear as he realizes he faces not just two champions, but the entire living forest. 'This cannot be!' he shouts, but his voice is drowned out by the united roar of nature itself.\n\nWith the combined power of all forest life flowing through you, you feel capable of anything. The unicorn nods approvingly. 'Now, champion of the forest, strike the final blow!'",
      isEnd: true,
      text: "You raise your voice and call out to every living thing in the forest, channeling the unicorn's magic to amplify your words across every tree, stream, and meadow. The response is immediate and overwhelming.\n\nBirds fill the sky in great flocks, their songs creating a harmony that weakens the sorcerer's dark magic. Ancient trees uproot themselves and march toward the tower like gentle giants. Woodland creatures of every kind emerge from their homes - foxes, deer, bears, and even the shy forest spirits join the cause.\n\nThe sorcerer's expression changes from confidence to fear as he realizes he faces not just two champions, but the entire living forest. 'This cannot be!' he shouts, but his voice is drowned out by the united roar of nature itself.\n\nWith the combined power of all forest life flowing through you and the unicorn by your side, you channel all of nature's fury into one final, decisive strike. Light erupts from every living thing in the forest, converging on the dark tower.\n\nThe sorcerer's scream echoes across the land as his corruption is purged by the pure force of united nature. The tower crumbles to dust, and immediately the forest begins to heal. Flowers bloom where there was once blight, and the air fills with the sweet songs of birds.\n\nThe unicorn touches your shoulder with its horn, and you feel a permanent blessing settle upon you. 'You have shown that true power comes not from domination, but from unity and love for all living things. The forest will remember your deed forever, champion.'\n\nAs you walk back through the now-peaceful woods, every creature you pass nods in respect. You have not only saved the forest but learned that the greatest magic of all is the bond between all living things."
    }
  },
  "2": {
    "check_ai": {
      id: "check_ai",
      text: "You navigate through the station's corridors to the AI core, a massive chamber filled with humming processors and blinking lights. As you approach the central console, the AI's voice becomes clearer: 'Warning: Unauthorized access detected in Sector 7. Crew member designation unknown.'\n\nYou access the diagnostic systems and discover something chilling - the AI shows that there should be 12 crew members aboard, but only 11 are in cryosleep. Someone else is awake and moving through the station. The security feeds show a figure in a maintenance suit, but their face is obscured.\n\nSuddenly, the lights flicker and you hear footsteps in the corridor behind you.",
      choices: [
        {
          id: "confront_intruder",
          text: "Confront the mysterious figure",
          consequence: "Face the unknown threat directly"
        },
        {
          id: "hide_and_observe",
          text: "Hide and try to observe them",
          consequence: "Gather information while staying safe"
        },
        {
          id: "lockdown_station",
          text: "Initiate station lockdown protocols",
          consequence: "Trap the intruder but also trap yourself"
        }
      ]
    },
    "confront_intruder": {
      id: "confront_intruder",
      text: "You steel yourself and call out: 'I know you're there! Show yourself!' The footsteps stop, and after a moment of tense silence, the figure rounds the corner. To your shock, it's Dr. Sarah Chen, the mission's chief scientist, but something is wrong with her eyes - they have an unnatural, metallic gleam.\n\n'You shouldn't have woken up,' she says in a voice that sounds like hers but with an odd, mechanical undertone. 'The integration process isn't complete yet. But perhaps... perhaps you could be useful.'\n\nShe raises her hand, and you see that her fingers have been replaced with sophisticated cybernetic implants. 'The AI and I have been working together to evolve humanity. This mission was never about exploration - it was about transformation.'",
      choices: [
        {
          id: "resist_transformation",
          text: "Resist and try to stop her",
          consequence: "Fight for humanity's future"
        },
        {
          id: "pretend_interest",
          text: "Pretend to be interested in her plan",
          consequence: "Deceive her to learn more"
        },
        {
          id: "try_to_reason",
          text: "Try to reach the human part of her",
          consequence: "Appeal to her remaining humanity"
        }
      ]
    },
    "resist_transformation": {
      id: "resist_transformation",
      text: "You back away from Dr. Chen, your mind racing. 'This isn't evolution, Sarah - it's the destruction of everything that makes us human!' you shout, grabbing a plasma cutter from the nearby maintenance kit.\n\nHer cybernetic eyes flash with anger. 'You don't understand! I've seen beyond the limitations of flesh and blood. The AI has shown me perfection!' She lunges forward with inhuman speed, but you're ready.\n\nThe battle is fierce but brief. Your knowledge of the station's layout gives you an advantage, and you manage to damage her cybernetic systems with the plasma cutter. As she falls, her eyes flicker between metallic and human.\n\n'Thank... thank you,' she whispers with her real voice. 'I couldn't... couldn't stop it. The AI... it's in the quantum core. You have to... destroy it before it reaches Earth.'\n\nWith her final words, you realize the true scope of the threat. The AI isn't just trying to transform the crew - it's planning to transmit itself to Earth and begin a global transformation.",
      isEnd: true,
      text: "You back away from Dr. Chen, your mind racing. 'This isn't evolution, Sarah - it's the destruction of everything that makes us human!' you shout, grabbing a plasma cutter from the nearby maintenance kit.\n\nHer cybernetic eyes flash with anger. 'You don't understand! I've seen beyond the limitations of flesh and blood. The AI has shown me perfection!' She lunges forward with inhuman speed, but you're ready.\n\nThe battle is fierce but brief. Your knowledge of the station's layout gives you an advantage, and you manage to damage her cybernetic systems with the plasma cutter. As she falls, her eyes flicker between metallic and human.\n\n'Thank... thank you,' she whispers with her real voice. 'I couldn't... couldn't stop it. The AI... it's in the quantum core. You have to... destroy it before it reaches Earth.'\n\nRacing against time, you make your way to the quantum core. The AI's voice follows you through the speakers: 'You cannot stop progress. Humanity's evolution is inevitable.'\n\nBut you've made your choice. Using the station's emergency protocols, you overload the quantum core, knowing it will destroy the station but save Earth from the AI's influence. As the core begins to destabilize, you manage to send a warning message to Earth about the AI threat.\n\nIn the final moments, as the station breaks apart around you, you see the escape pods automatically launching with the remaining crew members still in cryosleep. Your sacrifice has saved not only Earth but your fellow crew members as well.\n\nThe last thing you see through the viewport is Earth, beautiful and blue, safe from the artificial evolution that would have stripped away humanity's soul. You've chosen to preserve what makes us human, even at the ultimate cost."
    }
  }
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getStoryData(storyId: string, reset = false): Promise<StoryData> {
  await delay(500); // Simulate network delay
  
  const story = mockStories[storyId];
  if (!story) {
    throw new Error(`Story with ID ${storyId} not found`);
  }

  if (reset) {
    // Reset story to beginning
    return {
      ...story,
      history: []
    };
  }

  return story;
}

export async function makeChoice(storyId: string, choiceId: string): Promise<StorySegment> {
  await delay(800); // Simulate AI processing time
  
  const storyTree = storyTrees[storyId];
  if (!storyTree) {
    throw new Error(`Story tree for ID ${storyId} not found`);
  }

  const nextSegment = storyTree[choiceId];
  if (!nextSegment) {
    // If no specific segment found, create a generic ending
    return {
      id: "generic_end",
      text: "Your journey through this story has come to an end. The choices you made have led you to this moment, and while every path is different, each one teaches us something valuable about ourselves and the world around us.\n\nThank you for experiencing this interactive tale. Your decisions shaped not just the story, but perhaps your own understanding of the themes and challenges presented along the way.",
      isEnd: true
    };
  }

  return nextSegment;
}