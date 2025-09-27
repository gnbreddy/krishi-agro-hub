import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, User } from "lucide-react";

const predefinedQuestions = [
  "What are the best crops to plant in my region?", // English
  "How can I improve soil fertility?", // English
  "What are the common pests for wheat and how to control them?", // English
  "Suggest some organic farming techniques.", // English
  "मेरे क्षेत्र में कौन सी फसलें लगानी सबसे अच्छी हैं?", // Hindi
  "मैं मिट्टी की उर्वरता कैसे सुधार सकता हूँ?", // Hindi
  "गेहूं के लिए सामान्य कीट कौन से हैं और उन्हें कैसे नियंत्रित करें?", // Hindi
  "कुछ जैविक खेती तकनीकें सुझाएं।", // Hindi
  "నా ప్రాంతంలో ఏ పంటలు వేయడానికి ఉత్తమమైనవి?", // Telugu
  "నేను నేల సారాన్ని ఎలా మెరుగుపరచగలను?", // Telugu
  "గోధుమలకు సాధారణ తెగుళ్ళు ఏమిటి మరియు వాటిని ఎలా నియంత్రించాలి?", // Telugu
  "కొన్ని సేంద్రీయ వ్యవసాయ పద్ధతులను సూచించండి.", // Telugu
];

const predefinedAnswers = [
  "The best crops to plant in your region depend on your climate, soil type, and access to water. Some popular choices include...",
  "You can improve soil fertility by adding organic matter, using cover crops, and practicing crop rotation.",
  "Common pests for wheat include aphids, Hessian flies, and wheat stem sawflies. Control methods include...",
  "Some organic farming techniques include composting, using cover crops, and avoiding synthetic pesticides and fertilizers.",
  "आपके क्षेत्र में कौन सी फसलें लगानी सबसे अच्छी हैं, यह आपकी जलवायु, मिट्टी के प्रकार और पानी की उपलब्धता पर निर्भर करता है। कुछ लोकप्रिय विकल्प शामिल हैं...",
  "आप जैविक पदार्थ मिलाकर, कवर फसलों का उपयोग करके और फसल चक्रण का अभ्यास करके मिट्टी की उर्वरता में सुधार कर सकते हैं।",
  "गेहूं के लिए सामान्य कीटों में एफिड्स, हेसियन मक्खियाँ और गेहूं के तने के आरा मक्खियाँ शामिल हैं। नियंत्रण विधियों में शामिल हैं...",
  "कुछ जैविक खेती तकनीकों में खाद बनाना, कवर फसलों का उपयोग करना और सिंथेटिक कीटनाशकों और उर्वरकों से बचना शामिल है।",
  "మీ ప్రాంతంలో ఏ పంటలు వేయడానికి ఉత్తమమైనవి మీ వాతావరణం, నేల రకం మరియు నీటి లభ్యతపై ఆధారపడి ఉంటాయి. కొన్ని ప్రసిద్ధ ఎంపికలలో ఇవి ఉన్నాయి...",
  "సేంద్రీయ పదార్థాన్ని జోడించడం, కవర్ పంటలను ఉపయోగించడం మరియు పంట మార్పిడిని అభ్యసించడం ద్వారా మీరు నేల సారాన్ని మెరుగుపరచవచ్చు.",
  "గోధుమలకు సాధారణ తెగుళ్లలో అఫిడ్స్, హెస్సియన్ ఫ్లైస్ మరియు గోధుమ కాండం రంపపు ఈగలు ఉన్నాయి. నియంత్రణ పద్ధతుల్లో ఇవి ఉన్నాయి...",
  "కొన్ని సేంద్రీయ వ్యవసాయ పద్ధతుల్లో కంపోస్టింగ్, కవర్ పంటలను ఉపయోగించడం మరియు సింథటిక్ పురుగుమందులు మరియు ఎరువులను నివారించడం వంటివి ఉన్నాయి...",
];

export default function AIChat() {
  const [chatHistory, setChatHistory] = useState<{ user: string; bot: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

    const handleQuestionClick = async (question: string, index: number) => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: question }),
        });
        const data = await response.json();
        setChatHistory([...chatHistory, { user: question, bot: data.reply }]);
      } catch (error) {
        console.error("Failed to fetch from API", error);
      } finally {
        setIsLoading(false);
      }
    };

    const handleSendMessage = async () => {
        if (message.trim() === "") return;
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: message }),
            });
            const data = await response.json();
            setChatHistory([...chatHistory, { user: message, bot: data.reply }]);
            setMessage("");
        } catch (error) {
            console.error("Failed to fetch from API", error);
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <div className="space-y-6 p-4 max-w-4xl mx-auto">
      <div className="text-center py-4">
        <h1 className="text-3xl font-bold text-gradient-nature mb-2">
          AI Farming Assistant
        </h1>
        <p className="text-muted-foreground">
          Ask questions and get advice on your farming needs
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Predefined Questions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {predefinedQuestions.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => handleQuestionClick(question, index)}
              disabled={isLoading}
            >
              {question}
            </Button>
          ))}
        </CardContent>
      </Card>
      <div className="flex space-x-2">
          <textarea
              className="flex-grow border rounded-md p-2"
              placeholder="Ask me anything..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
          />
          <Button onClick={handleSendMessage} disabled={isLoading}>
              Send
          </Button>
      </div>
    {chatHistory.length > 0 && (
      <Card>
        <CardHeader>
            <CardTitle>Chat History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {chatHistory.map((chat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-start gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <p className="bg-primary/10 p-2 rounded-lg">{chat.user}</p>
                </div>
                <div className="flex items-start gap-2">
                  <Bot className="h-5 w-5 text-green-500" />
                  <p className="bg-green-500/10 p-2 rounded-lg">{chat.bot}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Bot className="h-5 w-5 animate-spin" />
                <span>AI is thinking...</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
