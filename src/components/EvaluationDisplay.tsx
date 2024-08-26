import React, { useEffect } from "react";
import useEssayEvaluationStore from "@/store/essayEvaluationStore";
import { Progress } from "@/components/ui/progress";
import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Criteria = "A" | "B" | "C";

const EvaluationDisplay: React.FC = () => {
  const {
    evaluationResult,
    setEvaluationResult,
    isLoading,
    isEvaluationRequested,
    setIsEvaluationRequested,
  } = useEssayEvaluationStore();

  useEffect(() => {
    if (isEvaluationRequested && !evaluationResult && !isLoading) {
      const dummyData = {
        overallScore: Math.floor(Math.random() * 41) + 60,
        criteriaScores: {
          A: Math.floor(Math.random() * 41) + 60,
          B: Math.floor(Math.random() * 41) + 60,
          C: Math.floor(Math.random() * 41) + 60,
        },
        evaluationDate: new Date().toISOString(),
        feedback: {
          A: "Excellent analysis of the subject matter.",
          B: "Good understanding but needs more examples.",
          C: "Satisfactory presentation, but could improve on clarity.",
        },
        evaluatorName: "John Doe",
        subject: "English Literature",
      };

      setEvaluationResult(dummyData);
    }
  }, [isEvaluationRequested, isLoading, evaluationResult, setEvaluationResult]);

  if (!isEvaluationRequested) {
    return null;
  }

  const closeModal = () => {
    setIsEvaluationRequested(false);
  };

  const isGoodScore = (score: number) => score >= 85;

  return (
    <Dialog open={isEvaluationRequested} onOpenChange={closeModal}>
      <DialogContent className="p-4 max-w-xs sm:max-w-sm md:max-w-md mx-auto rounded-lg">
        <DialogHeader>
          <DialogTitle>Evaluation Results</DialogTitle>
        </DialogHeader>
        <CardContent>
          <div className="space-y-6">
            {isLoading ? (
              <>
                <div className="flex flex-col items-center">
                  <Skeleton className="w-32 h-32 rounded-full" />
                  <Skeleton className="mt-2 w-20 h-4" />
                </div>
                <div className="mt-6">
                  <Skeleton className="w-40 h-6 mb-2" />
                  {[1, 2, 3].map((index) => (
                    <div key={index} className="mb-2">
                      <div className="flex justify-between mb-1">
                        <Skeleton className="w-24 h-4" />
                        <Skeleton className="w-12 h-4" />
                      </div>
                      <Skeleton className="h-2 w-full" />
                    </div>
                  ))}
                </div>
                <Skeleton className="w-48 h-4 mt-4" />
              </>
            ) : (
              <>
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32">
                    <Progress
                      value={evaluationResult?.overallScore ?? 0}
                      className="w-32 h-32"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-green-600">
                        {evaluationResult?.overallScore}%
                      </span>
                    </div>
                  </div>
                  <span className="mt-2 text-sm text-gray-500">
                    Overall Score
                  </span>
                  {evaluationResult &&
                    isGoodScore(evaluationResult.overallScore) && (
                      <p className="text-lg font-semibold text-green-600 mt-4">
                        Congratulations! You&apos;ve achieved a great score!
                      </p>
                    )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Score Breakdown
                  </h3>
                  {evaluationResult &&
                    (
                      Object.entries(evaluationResult.criteriaScores) as [
                        Criteria,
                        number
                      ][]
                    ).map(([criteria, score]) => (
                      <div key={criteria} className="mb-2">
                        <div className="flex justify-between mb-1">
                          <span>Criteria {criteria}</span>
                          <span className="font-medium">{score}%</span>
                        </div>
                        <Progress value={score} className="h-2" />
                        {isGoodScore(score) && (
                          <p className="text-sm font-medium text-green-600 mt-1">
                            Well done on Criteria {criteria}!
                          </p>
                        )}
                      </div>
                    ))}
                </div>

                <div className="text-sm text-gray-600">
                  Evaluation Date:{" "}
                  {new Date(
                    evaluationResult?.evaluationDate ?? ""
                  ).toLocaleDateString()}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </DialogContent>
    </Dialog>
  );
};

export default EvaluationDisplay;
