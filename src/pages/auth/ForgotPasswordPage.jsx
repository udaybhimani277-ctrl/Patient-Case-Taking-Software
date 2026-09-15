import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HeartPulse,
  KeyRound,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Smartphone,
  RotateCcw
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { resetPassword } = useDemo();

  const [step, setStep] = useState(1); // 1: Identifier -> 2: OTP -> 3: New Password
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleStep1 = (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setErrorMessage("Please enter your registered Mobile Number, ABHA ID, or Email.");
      return;
    }
    setErrorMessage('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtp('458921'); // Auto-fill simulated SMS OTP for convenience
      setStep(2);
    }, 400);
  };

  const handleStep2 = (e) => {
    e.preventDefault();
    if (otp.length < 6) {
      setErrorMessage("Please enter the 6-digit verification code sent via SMS.");
      return;
    }
    setErrorMessage('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 400);
  };

  const handleStep3 = (e) => {
    e.preventDefault();
    if (!newPassword.trim() || newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    setErrorMessage('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      resetPassword(identifier, newPassword);
      navigate('/login');
    }, 400);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-3 sm:p-6 my-auto">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black text-slate-900">
            Account Recovery
          </h2>
          <p className="text-xs text-slate-500">
            {step === 1 && "Enter your registered credentials to receive a verification OTP."}
            {step === 2 && "Enter the 6-digit security code dispatched to your registered device."}
            {step === 3 && "Create a new strong password for your MediKiosk account."}
          </p>
        </div>

        {/* 3-Stage Progress Indicator */}
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all ${
                step === s
                  ? 'w-8 bg-blue-600'
                  : step > s
                  ? 'w-5 bg-emerald-500'
                  : 'w-5 bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STAGE 1: IDENTIFIER */}
        {step === 1 && (
          <form onSubmit={handleStep1} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                Registered Mobile, ABHA ID, or Email
              </label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. 98250 44120 or dr.mehta@civilhospital.gov.in"
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? "Sending OTP..." : "Send Verification OTP"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STAGE 2: OTP VERIFICATION */}
        {step === 2 && (
          <form onSubmit={handleStep2} className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-700">Enter 6-Digit OTP</label>
                <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  Demo Code: 458921
                </span>
              </div>
              <input
                type="text"
                maxLength={6}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full text-center tracking-widest text-lg font-mono font-bold p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? "Verifying Code..." : "Verify OTP & Continue"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STAGE 3: NEW PASSWORD */}
        {step === 3 && (
          <form onSubmit={handleStep3} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? "Updating Password..." : "Set New Password & Sign In"}
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Return to Login */}
        <div className="text-center pt-2">
          <Link
            to="/login"
            className="text-xs font-bold text-slate-500 hover:text-blue-600"
          >
            ← Cancel and return to Login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ForgotPasswordPage;
