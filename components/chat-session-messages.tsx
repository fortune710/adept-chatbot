import ChatInput from "@/components/chat-input";
import ChatMessage from "@/components/chat-message";
import { cn } from "@/lib/utils";

const dummyMessages = [
  { isAi: false, content: "Hello! Can you explain how photosynthesis works?" },
  {
    isAi: true,
    content:
      "Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to produce oxygen and energy in the form of sugar. Here's a basic breakdown of the process:\n\n1. Light Absorption: Chlorophyll in the plant leaves absorbs sunlight.\n2. Water Breakdown: The plant uses the light energy to split water molecules into hydrogen and oxygen.\n3. Carbon Dioxide Conversion: The plant takes in carbon dioxide from the air.\n4. Sugar Production: Using the energy from the light and the hydrogen from the water, the plant converts the carbon dioxide into glucose (sugar).\n5. Oxygen Release: Oxygen, a byproduct of the process, is released into the atmosphere.\n\nThis process is crucial for life on Earth as it produces oxygen and serves as the basis for most food chains.",
  },
  {
    isAi: false,
    content: "That's fascinating! How do plants store the energy they produce?",
  },
  {
    isAi: true,
    content:
      "Great question! Plants store the energy they produce through photosynthesis in several ways:\n\n1. Glucose: The immediate product of photosynthesis is glucose, a simple sugar. Some of this is used immediately by the plant for energy.\n\n2. Starch: Excess glucose is converted into starch, which is stored in various parts of the plant, including leaves, stems, roots, and fruits. This is a short-term storage form that can be quickly converted back to glucose when needed.\n\n3. Cellulose: Some glucose is used to produce cellulose, which forms the cell walls of plants. While not used directly for energy, it's crucial for the plant's structure.\n\n4. Oils and Fats: In some plants, especially in seeds, energy is stored as oils or fats. These are more energy-dense than carbohydrates.\n\n5. Other Compounds: Plants also use the energy to produce various other compounds like proteins and secondary metabolites, which serve different functions in the plant.\n\nThis stored energy not only sustains the plant but also provides energy for other organisms in the food chain when they consume plant matter.",
  },
];

export default function ChatSessionMesssages({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-[89%] 2xl:h-[89%] max-md:h-[65%] max-sm:h-[65%] flex flex-col max-w-2xl gap-4 mx-auto",
        className,
      )}
    >
      <div className="flex-1 overflow-auto">
        {dummyMessages.map((message, index) => (
          <ChatMessage
            key={index}
            isAi={message.isAi}
            content={message.content}
          />
        ))}
      </div>
      <ChatInput />
    </div>
  );
}
