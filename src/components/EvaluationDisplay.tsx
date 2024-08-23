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

  return (
    <Dialog open={isEvaluationRequested} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Evaluation Results</DialogTitle>
        </DialogHeader>
        <CardContent>
          <div className="space-y-6">
            {isLoading ? (
              <>
                <Skeleton className="w-32 h-32 rounded-full mx-auto" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
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
                      <span className="text-2xl font-bold">
                        {evaluationResult?.overallScore}%
                      </span>
                    </div>
                  </div>
                  <span className="mt-2 text-sm text-gray-500">
                    Overall Score
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Score Breakdown
                  </h3>
                  {evaluationResult &&
                    Object.entries(evaluationResult.criteriaScores).map(
                      ([criteria, score]) => (
                        <div key={criteria} className="mb-2">
                          <div className="flex justify-between mb-1">
                            <span>Criteria {criteria}</span>
                            <span className="font-medium">{score}%</span>
                          </div>
                          <Progress value={score} className="h-2" />
                        </div>
                      )
                    )}
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
