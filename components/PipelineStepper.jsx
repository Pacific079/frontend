// components/PipelineStepper.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, FlaskConical } from 'lucide-react';
import { useLanguage } from '../App';

const PipelineStepper = ({ pipelineSteps }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % (pipelineSteps.length + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [pipelineSteps]);

  return (
    <motion.div className="bg-slate-800/50 p-6 rounded-2xl">
      <h3 className="text-xl font-semibold mb-6 text-cyan-300">{t('pipelineStatus')}</h3>
      <div className="flex items-center">
        {pipelineSteps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${index < currentStep ? 'bg-cyan-500 border-cyan-400' : 'bg-slate-700 border-slate-500'}`}>
                {index < currentStep ? <CheckCircle className="text-white" /> : <FlaskConical className="text-slate-400" />}
              </div>
              <p className={`mt-2 text-xs text-center ${index < currentStep ? 'text-cyan-300' : 'text-slate-400'}`}>{step}</p>
            </div>
            {index < pipelineSteps.length - 1 && (
              <div className="flex-1 h-1 bg-slate-700 mx-2 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-cyan-500"
                  initial={{ width: '0%' }}
                  animate={{ width: index < currentStep ? '100%' : '0%' }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};

export default PipelineStepper;