'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  CheckCircle,
  Circle,
  Lock,
  Play,
  ArrowRight,
  Lightbulb,
  Target,
  Zap,
  TrendingUp,
  Users,
  Brain,
  FileText,
  Settings,
  Award,
  Video,
  Code,
  Database
} from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  icon: any;
  color: string;
  tasks: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

export default function TutorialPage() {
  const [activeStep, setActiveStep] = useState<string>('1');
  const [expandedStep, setExpandedStep] = useState<string | null>('1');

  const [steps, setSteps] = useState<Step[]>([
    {
      id: '1',
      title: 'Welcome to OASIS BI PRO',
      description: 'Get started with your analytics platform and explore the dashboard',
      duration: '5 min',
      completed: false,
      locked: false,
      icon: Zap,
      color: 'blue',
      tasks: [
        { id: '1-1', title: 'Explore the main dashboard', completed: false },
        { id: '1-2', title: 'Understand key metrics', completed: false },
        { id: '1-3', title: 'Navigate the sidebar menu', completed: false }
      ]
    },
    {
      id: '2',
      title: 'Connect Your Data Sources',
      description: 'Integrate your business data from multiple platforms',
      duration: '10 min',
      completed: false,
      locked: false,
      icon: Database,
      color: 'green',
      tasks: [
        { id: '2-1', title: 'Go to Integrations page', completed: false },
        { id: '2-2', title: 'Connect Google Analytics', completed: false },
        { id: '2-3', title: 'Connect E-commerce platform', completed: false },
        { id: '2-4', title: 'Test data sync', completed: false }
      ]
    },
    {
      id: '3',
      title: 'Real-Time Analytics',
      description: 'Monitor live user activity and business metrics',
      duration: '8 min',
      completed: false,
      locked: false,
      icon: Activity,
      color: 'purple',
      tasks: [
        { id: '3-1', title: 'Open Real-time Analytics', completed: false },
        { id: '3-2', title: 'Review active users', completed: false },
        { id: '3-3', title: 'Check traffic sources', completed: false },
        { id: '3-4', title: 'Monitor conversions', completed: false }
      ]
    },
    {
      id: '4',
      title: 'Create Custom Reports',
      description: 'Build tailored reports for your business needs',
      duration: '12 min',
      completed: false,
      locked: false,
      icon: FileText,
      color: 'orange',
      tasks: [
        { id: '4-1', title: 'Navigate to Reports', completed: false },
        { id: '4-2', title: 'Choose a template', completed: false },
        { id: '4-3', title: 'Select metrics', completed: false },
        { id: '4-4', title: 'Generate your first report', completed: false }
      ]
    },
    {
      id: '5',
      title: 'AI-Powered Insights',
      description: 'Leverage machine learning for actionable recommendations',
      duration: '7 min',
      completed: false,
      locked: false,
      icon: Brain,
      color: 'pink',
      tasks: [
        { id: '5-1', title: 'Open AI Insights page', completed: false },
        { id: '5-2', title: 'Review opportunities', completed: false },
        { id: '5-3', title: 'Understand confidence scores', completed: false },
        { id: '5-4', title: 'Take action on insights', completed: false }
      ]
    },
    {
      id: '6',
      title: 'Team Collaboration',
      description: 'Invite team members and manage permissions',
      duration: '6 min',
      completed: false,
      locked: false,
      icon: Users,
      color: 'indigo',
      tasks: [
        { id: '6-1', title: 'Go to Team Management', completed: false },
        { id: '6-2', title: 'Invite a team member', completed: false },
        { id: '6-3', title: 'Set role permissions', completed: false }
      ]
    },
    {
      id: '7',
      title: 'Advanced Features',
      description: 'Unlock advanced analytics and automation',
      duration: '15 min',
      completed: false,
      locked: true,
      icon: Target,
      color: 'red',
      tasks: [
        { id: '7-1', title: 'Set up scheduled reports', completed: false },
        { id: '7-2', title: 'Create custom dashboards', completed: false },
        { id: '7-3', title: 'Configure alerts', completed: false }
      ]
    }
  ]);

  const totalTasks = steps.reduce((sum, step) => sum + step.tasks.length, 0);
  const completedTasks = steps.reduce((sum, step) => sum + step.tasks.filter(t => t.completed).length, 0);
  const progress = Math.round((completedTasks / totalTasks) * 100);

  const toggleTask = (stepId: string, taskId: string) => {
    setSteps(steps.map(step => {
      if (step.id === stepId) {
        return {
          ...step,
          tasks: step.tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ),
          completed: step.tasks.filter(t => t.id !== taskId || !t.completed).every(t => t.completed)
        };
      }
      return step;
    }));
  };

  const completedSteps = steps.filter(s => s.completed).length;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-blue-600" />
          Getting Started Tutorial
        </h2>
        <p className="text-gray-600">
          Follow this step-by-step guide to master OASIS BI PRO
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Your Progress</h3>
            <p className="text-blue-100">
              {completedSteps} of {steps.length} steps completed • {completedTasks} of {totalTasks} tasks done
            </p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold mb-1">{progress}%</div>
            <p className="text-blue-100 text-sm">Complete</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="relative h-4 bg-white/20 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {progress === 100 && (
          <div className="mt-6 flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border-2 border-white/20">
            <Award className="w-8 h-8 text-yellow-300" />
            <div>
              <p className="font-bold text-lg">Congratulations! 🎉</p>
              <p className="text-blue-100 text-sm">You've completed the tutorial. You're now a pro!</p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            label: 'Video Walkthrough', 
            icon: Video, 
            color: 'blue',
            description: 'Watch a 10-minute overview'
          },
          { 
            label: 'Documentation', 
            icon: BookOpen, 
            color: 'purple',
            description: 'Read detailed guides'
          },
          { 
            label: 'API Reference', 
            icon: Code, 
            color: 'green',
            description: 'For developers'
          }
        ].map((action, index) => (
          <button
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100 hover:border-blue-500 transition-all text-left"
          >
            <div className={`w-12 h-12 bg-gradient-to-br from-${action.color}-500 to-${action.color}-600 rounded-xl flex items-center justify-center mb-4`}>
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-gray-900 mb-1">{action.label}</h4>
            <p className="text-sm text-gray-600">{action.description}</p>
          </button>
        ))}
      </div>

      {/* Tutorial Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isExpanded = expandedStep === step.id;
          const completedTasksCount = step.tasks.filter(t => t.completed).length;
          
          return (
            <div
              key={step.id}
              className={`bg-white rounded-2xl shadow-lg border-2 transition-all overflow-hidden ${
                step.locked 
                  ? 'border-gray-200 opacity-60' 
                  : step.completed 
                    ? 'border-green-500' 
                    : isExpanded 
                      ? `border-${step.color}-500` 
                      : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Step Header */}
              <button
                onClick={() => !step.locked && setExpandedStep(isExpanded ? null : step.id)}
                disabled={step.locked}
                className="w-full p-6 text-left flex items-center gap-6 transition-all"
              >
                {/* Step Number Circle */}
                <div className="flex-shrink-0">
                  {step.locked ? (
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <Lock className="w-8 h-8 text-gray-400" />
                    </div>
                  ) : step.completed ? (
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                  ) : (
                    <div className={`w-16 h-16 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-full flex items-center justify-center`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>

                {/* Step Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                    {step.locked && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">
                        LOCKED
                      </span>
                    )}
                    {step.completed && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border-2 border-green-300">
                        COMPLETED
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{step.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {step.duration}
                    </span>
                    <span className="text-gray-500">
                      {completedTasksCount} / {step.tasks.length} tasks completed
                    </span>
                  </div>
                </div>

                {/* Progress Indicator */}
                {!step.locked && (
                  <div className="flex-shrink-0 text-right">
                    <div className="w-20 h-20 relative">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          stroke="#e5e7eb"
                          strokeWidth="6"
                          fill="none"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          stroke={`var(--${step.color}-600)`}
                          strokeWidth="6"
                          fill="none"
                          strokeDasharray={`${(completedTasksCount / step.tasks.length) * 226} 226`}
                          strokeLinecap="round"
                          className={`stroke-${step.color}-600`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-gray-900">
                          {Math.round((completedTasksCount / step.tasks.length) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </button>

              {/* Expanded Tasks */}
              {isExpanded && !step.locked && (
                <div className={`border-t-2 border-gray-200 bg-gradient-to-br from-${step.color}-50 to-white p-6`}>
                  <div className="space-y-3 mb-6">
                    {step.tasks.map((task) => (
                      <button
                        key={task.id}
                        onClick={() => toggleTask(step.id, task.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                          task.completed
                            ? 'bg-green-100 border-2 border-green-300'
                            : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          task.completed
                            ? 'bg-green-600'
                            : `bg-${step.color}-600`
                        }`}>
                          {task.completed ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : (
                            <Circle className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <span className={`flex-1 text-left font-semibold ${
                          task.completed ? 'text-green-900 line-through' : 'text-gray-900'
                        }`}>
                          {task.title}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {step.id === '1' && (
                      <Link
                        href="/dashboard"
                        className={`flex-1 px-6 py-3 bg-gradient-to-r from-${step.color}-600 to-${step.color}-700 text-white rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2`}
                      >
                        <Play className="w-5 h-5" />
                        Start Tutorial
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    )}
                    {step.id === '2' && (
                      <Link
                        href="/member/integrations"
                        className={`flex-1 px-6 py-3 bg-gradient-to-r from-${step.color}-600 to-${step.color}-700 text-white rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2`}
                      >
                        <Database className="w-5 h-5" />
                        Go to Integrations
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    )}
                    {step.id === '3' && (
                      <Link
                        href="/member/analytics/realtime"
                        className={`flex-1 px-6 py-3 bg-gradient-to-r from-${step.color}-600 to-${step.color}-700 text-white rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2`}
                      >
                        <Zap className="w-5 h-5" />
                        Open Real-time Analytics
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    )}
                    {step.id === '4' && (
                      <Link
                        href="/member/reports/create"
                        className={`flex-1 px-6 py-3 bg-gradient-to-r from-${step.color}-600 to-${step.color}-700 text-white rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2`}
                      >
                        <FileText className="w-5 h-5" />
                        Create Report
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    )}
                    {step.id === '5' && (
                      <Link
                        href="/member/insights"
                        className={`flex-1 px-6 py-3 bg-gradient-to-r from-${step.color}-600 to-${step.color}-700 text-white rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2`}
                      >
                        <Brain className="w-5 h-5" />
                        View AI Insights
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    )}
                    {step.id === '6' && (
                      <Link
                        href="/member/team"
                        className={`flex-1 px-6 py-3 bg-gradient-to-r from-${step.color}-600 to-${step.color}-700 text-white rounded-xl font:bold hover:shadow-xl transition-all flex items-center justify-center gap-2`}
                      >
                        <Users className="w-5 h-5" />
                        Team Management
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Help Section */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-8 border-2 border-purple-200">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Need Help?</h3>
            <p className="text-gray-700 mb-6">
              Our support team is here to help you get the most out of OASIS BI PRO
            </p>
            <div className="flex gap-4">
              <a
                href="mailto:support@oasis-bi.pro"
                className="px-6 py-3 bg-white text-purple-600 border-2 border-purple-300 rounded-xl font-bold hover:bg-purple-50 transition-all"
              >
                Contact Support
              </a>
              <a
                href="/legal/faq"
                className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all"
              >
                View FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
