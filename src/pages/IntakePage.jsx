import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { content } from '../content/content';
import FoodPreferences from '../components/FoodPreferences';

const WHATSAPP_NUMBER = '967773031599';

function Field({ label, children, optional, isAr, t }) {
  return (
    <div>
      <label className="text-brand-muted text-[11px] font-semibold tracking-wider uppercase block mb-2">
        {label} {optional && <span className="text-brand-muted/60 normal-case font-normal">{t.optional[isAr ? 'ar' : 'en']}</span>}
      </label>
      {children}
    </div>
  );
}

const inputWrap = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.06)',
};

function TextInput({ value, onChange, placeholder, type = 'text', required, isAr }) {
  return (
    <div className="rounded-xl px-4 py-3 transition-all duration-200 focus-within:border-brand-gold/30" style={inputWrap}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        dir={type === 'number' ? 'ltr' : isAr ? 'rtl' : 'ltr'}
        className="bg-transparent w-full text-brand-white text-sm placeholder:text-brand-muted/40 focus:outline-none"
      />
    </div>
  );
}

function TextArea({ value, onChange, placeholder, rows = 2, isAr }) {
  return (
    <div className="rounded-xl px-4 py-3 transition-all duration-200 focus-within:border-brand-gold/30" style={inputWrap}>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        dir={isAr ? 'rtl' : 'ltr'}
        className="bg-transparent w-full text-brand-white text-sm placeholder:text-brand-muted/40 focus:outline-none resize-none"
      />
    </div>
  );
}

function Chips({ options, value, onChange, lang }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`text-sm font-semibold px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
              active
                ? 'bg-brand-gold text-brand-bg border-brand-gold shadow-lg shadow-yellow-700/30'
                : 'border-[#2a2a2a] text-brand-muted hover:border-brand-gold/50 hover:text-brand-light'
            }`}
          >
            {opt[lang]}
          </button>
        );
      })}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h3 className="text-brand-gold text-xs font-black tracking-widest uppercase mb-4 mt-2 flex items-center gap-2">
      <span className="w-6 h-px bg-brand-gold/40" />
      {children}
    </h3>
  );
}

export default function IntakePage() {
  const { lang } = useLang();
  const t = content.intake;
  const isAr = lang === 'ar';

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [form, setForm] = useState({
    name: '',
    gender: 'male',
    height: '',
    weight: '',
    age: '',
    location: 'gym',
    tools: '',
    days: '',
    job: 'office',
    sports: '',
    conditions: '',
    surgeries: '',
    medications: '',
    allergies: '',
    goal: 'muscle',
    level: 'beginner',
    waist: '',
    chest: '',
    hips: '',
    thigh: '',
    arm: '',
  });

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  // ── Two-step flow ──
  const [step, setStep] = useState(1);

  // ── Food-preferences state (owned here, structured separately from `form`) ──
  const [food, setFood] = useState({
    protein: [],
    carbs: [],
    fats: [],
    proteinOther: '',
    carbsOther: '',
    fatsOther: '',
  });
  const [foodErrors, setFoodErrors] = useState({});

  const clearFoodError = (catId) =>
    setFoodErrors((e) => {
      if (!e[catId]) return e;
      const next = { ...e };
      delete next[catId];
      return next;
    });

  const toggleFood = (catId, optId) => {
    setFood((f) => {
      const list = f[catId] || [];
      const next = list.includes(optId)
        ? list.filter((id) => id !== optId)
        : [...list, optId];
      return { ...f, [catId]: next };
    });
    clearFoodError(catId);
  };

  const setFoodOther = (catId, value) => {
    setFood((f) => ({ ...f, [`${catId}Other`]: value }));
    if (value.trim() !== '') clearFoodError(catId);
  };

  // Step 1 → Step 2. Native `required` validation on the form gates this handler,
  // so required questionnaire fields cannot be bypassed.
  const handleContinue = (e) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    setStep(1);
    window.scrollTo(0, 0);
  };

  const validateFood = () => {
    const errs = {};
    content.foodPrefs.categories.forEach((cat) => {
      const hasSelection = (food[cat.id] || []).length > 0;
      const hasOther = (food[`${cat.id}Other`] || '').trim() !== '';
      if (!hasSelection && !hasOther) errs[cat.id] = true;
    });
    setFoodErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSend = () => {
    if (!validateFood()) {
      window.scrollTo(0, 0);
      return;
    }

    const goalLabel = t.goals.find((g) => g.id === form.goal)?.[lang] || form.goal;
    const levelLabel = t.levels.find((l) => l.id === form.level)?.[lang] || form.level;
    const locLabel = form.location === 'gym' ? t.gym[lang] : t.home[lang];
    const jobLabel = form.job === 'office' ? t.office[lang] : t.active[lang];
    const genderLabel = form.gender === 'male' ? t.male[lang] : t.female[lang];

    const L = (en, ar) => (isAr ? ar : en);
    const lines = [
      `*${L('NEW CLIENT INTAKE', 'استبيان عميل جديد')}*`,
      '',
      `*${t.name[lang]}:* ${form.name}`,
      `*${t.gender[lang]}:* ${genderLabel}`,
      '',
      `*${t.s1[lang]}*`,
      `• ${t.height[lang]}: ${form.height}`,
      `• ${t.weight[lang]}: ${form.weight}`,
      `• ${t.age[lang]}: ${form.age}`,
      '',
      `*${t.s2[lang]}*`,
      `• ${t.loc[lang]} ${locLabel}`,
      ...(form.location === 'home' && form.tools ? [`• ${t.tools[lang].split('—')[0].trim()}: ${form.tools}`] : []),
      `• ${t.days[lang]}: ${form.days}`,
      '',
      `*${t.s3[lang]}*`,
      `• ${t.job[lang]}: ${jobLabel}`,
      ...(form.sports ? [`• ${t.sports[lang]} ${form.sports}`] : []),
      '',
      `*${t.s4[lang]}*`,
      `• ${t.conds[lang]} ${form.conditions || '—'}`,
      `• ${t.surg[lang]} ${form.surgeries || '—'}`,
      `• ${t.meds[lang]} ${form.medications || '—'}`,
      `• ${t.allergy[lang]}: ${form.allergies || '—'}`,
      '',
      `*${t.s5[lang]}*`,
      `• ${t.goal[lang]}: ${goalLabel}`,
      `• ${t.level[lang]}: ${levelLabel}`,
      '',
      `*${t.s6[lang]}*`,
      ...(form.gender === 'male'
        ? [L('Will send 4 photos (front, back, sides) next on WhatsApp.', 'سأرسل 4 صور (أمامية، خلفية، جانبيتان) تباعاً على واتساب.')]
        : [
            `• ${t.waist[lang]}: ${form.waist}`,
            `• ${t.chest[lang]}: ${form.chest}`,
            `• ${t.hips[lang]}: ${form.hips}`,
            `• ${t.thigh[lang]}: ${form.thigh}`,
            `• ${t.arm[lang]}: ${form.arm}`,
          ]),
    ];

    // ── Food preferences section (IDs resolved to visible localized labels) ──
    const fp = content.foodPrefs;
    const sep = isAr ? '، ' : ', ';
    const foodLines = ['', `*${fp.waTitle[lang]}*`];
    fp.categories.forEach((cat) => {
      const names = (food[cat.id] || [])
        .map((id) => cat.options.find((o) => o.id === id)?.[lang])
        .filter(Boolean);
      const otherVal = (food[`${cat.id}Other`] || '').trim();
      foodLines.push('', `*${cat.title[lang]}:*`);
      if (names.length) foodLines.push(names.join(sep));
      if (otherVal) foodLines.push(`*${fp.waOther[lang]}:* ${otherVal}`);
    });

    const allLines = [...lines, ...foodLines];
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(allLines.join('\n'))}`;
    window.open(url, '_blank');
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-gold text-sm font-medium transition-colors duration-200 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          {isAr ? 'العودة للرئيسية' : 'Back to Home'}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <div className="inline-flex items-center gap-2 border border-brand-gold/20 bg-brand-gold/5 text-brand-gold text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full">
              <span className="w-1 h-1 rounded-full bg-brand-gold" />
              {step === 1 ? t.badge[lang] : content.foodPrefs.badge[lang]}
            </div>
            <span className="text-brand-muted text-[11px] font-semibold tracking-wider uppercase">
              {step === 1 ? t.step1of2[lang] : t.step2of2[lang]}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-brand-white mb-4">
            {step === 1 ? t.heading[lang] : content.foodPrefs.heading[lang]}
          </h1>
          <p className="text-brand-muted text-base leading-relaxed mb-10 max-w-2xl">
            {step === 1 ? t.sub[lang] : content.foodPrefs.sub[lang]}
          </p>

          {step === 1 && (
          <form
            onSubmit={handleContinue}
            className="rounded-2xl p-6 md:p-10 space-y-8"
            style={{
              background: 'linear-gradient(135deg, rgba(20,18,15,0.95) 0%, rgba(10,10,10,0.95) 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 8px 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* Name + Gender */}
            <div className="space-y-5">
              <Field label={t.name[lang]} isAr={isAr} t={t}>
                <TextInput value={form.name} onChange={set('name')} required isAr={isAr} />
              </Field>
              <Field label={t.gender[lang]} isAr={isAr} t={t}>
                <Chips
                  options={[
                    { id: 'male', en: t.male.en, ar: t.male.ar },
                    { id: 'female', en: t.female.en, ar: t.female.ar },
                  ]}
                  value={form.gender}
                  onChange={set('gender')}
                  lang={lang}
                />
              </Field>
            </div>

            {/* Section 1 */}
            <div>
              <SectionTitle>{t.s1[lang]}</SectionTitle>
              <div className="grid grid-cols-3 gap-3">
                <Field label={t.height[lang]} isAr={isAr} t={t}>
                  <TextInput type="number" value={form.height} onChange={set('height')} required isAr={isAr} />
                </Field>
                <Field label={t.weight[lang]} isAr={isAr} t={t}>
                  <TextInput type="number" value={form.weight} onChange={set('weight')} required isAr={isAr} />
                </Field>
                <Field label={t.age[lang]} isAr={isAr} t={t}>
                  <TextInput type="number" value={form.age} onChange={set('age')} required isAr={isAr} />
                </Field>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <SectionTitle>{t.s2[lang]}</SectionTitle>
              <div className="space-y-5">
                <Field label={t.loc[lang]} isAr={isAr} t={t}>
                  <Chips
                    options={[
                      { id: 'gym', en: t.gym.en, ar: t.gym.ar },
                      { id: 'home', en: t.home.en, ar: t.home.ar },
                    ]}
                    value={form.location}
                    onChange={set('location')}
                    lang={lang}
                  />
                </Field>
                {form.location === 'home' && (
                  <Field label={t.tools[lang]} isAr={isAr} t={t}>
                    <TextArea value={form.tools} onChange={set('tools')} isAr={isAr} />
                  </Field>
                )}
                <Field label={t.days[lang]} isAr={isAr} t={t}>
                  <TextInput type="number" value={form.days} onChange={set('days')} required isAr={isAr} />
                </Field>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <SectionTitle>{t.s3[lang]}</SectionTitle>
              <div className="space-y-5">
                <Field label={t.job[lang]} isAr={isAr} t={t}>
                  <Chips
                    options={[
                      { id: 'office', en: t.office.en, ar: t.office.ar },
                      { id: 'active', en: t.active.en, ar: t.active.ar },
                    ]}
                    value={form.job}
                    onChange={set('job')}
                    lang={lang}
                  />
                </Field>
                <Field label={t.sports[lang]} optional isAr={isAr} t={t}>
                  <TextInput value={form.sports} onChange={set('sports')} isAr={isAr} />
                </Field>
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <SectionTitle>{t.s4[lang]}</SectionTitle>
              <div className="space-y-5">
                <Field label={t.conds[lang]} isAr={isAr} t={t}>
                  <TextArea value={form.conditions} onChange={set('conditions')} isAr={isAr} />
                </Field>
                <Field label={t.surg[lang]} isAr={isAr} t={t}>
                  <TextInput value={form.surgeries} onChange={set('surgeries')} isAr={isAr} />
                </Field>
                <Field label={t.meds[lang]} isAr={isAr} t={t}>
                  <TextInput value={form.medications} onChange={set('medications')} isAr={isAr} />
                </Field>
                <Field label={t.allergy[lang]} optional isAr={isAr} t={t}>
                  <TextInput value={form.allergies} onChange={set('allergies')} isAr={isAr} />
                </Field>
              </div>
            </div>

            {/* Section 5 */}
            <div>
              <SectionTitle>{t.s5[lang]}</SectionTitle>
              <div className="space-y-5">
                <Field label={t.goal[lang]} isAr={isAr} t={t}>
                  <Chips options={t.goals} value={form.goal} onChange={set('goal')} lang={lang} />
                </Field>
                <Field label={t.level[lang]} isAr={isAr} t={t}>
                  <Chips options={t.levels} value={form.level} onChange={set('level')} lang={lang} />
                </Field>
              </div>
            </div>

            {/* Section 6 — gender-aware */}
            <div>
              <SectionTitle>{t.s6[lang]}</SectionTitle>
              {form.gender === 'male' ? (
                <div
                  className="rounded-xl p-4 text-sm text-brand-light leading-relaxed"
                  style={{ background: 'rgba(201,169,110,0.06)', border: '1px solid rgba(201,169,110,0.2)' }}
                >
                  📸 {t.malePhotoNote[lang]}
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-brand-muted text-xs leading-relaxed">🌸 {t.femaleNote[lang]}</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <Field label={t.waist[lang]} isAr={isAr} t={t}>
                      <TextInput type="number" value={form.waist} onChange={set('waist')} isAr={isAr} />
                    </Field>
                    <Field label={t.chest[lang]} isAr={isAr} t={t}>
                      <TextInput type="number" value={form.chest} onChange={set('chest')} isAr={isAr} />
                    </Field>
                    <Field label={t.hips[lang]} isAr={isAr} t={t}>
                      <TextInput type="number" value={form.hips} onChange={set('hips')} isAr={isAr} />
                    </Field>
                    <Field label={t.thigh[lang]} isAr={isAr} t={t}>
                      <TextInput type="number" value={form.thigh} onChange={set('thigh')} isAr={isAr} />
                    </Field>
                    <Field label={t.arm[lang]} isAr={isAr} t={t}>
                      <TextInput type="number" value={form.arm} onChange={set('arm')} isAr={isAr} />
                    </Field>
                  </div>
                </div>
              )}
            </div>

            {/* Continue to Step 2 */}
            <div className="pt-2">
              <button
                type="submit"
                className="btn-shimmer w-full flex items-center justify-center gap-3 text-brand-bg font-bold px-8 py-4 rounded-full text-sm transition-all duration-300 hover:scale-[1.01] cursor-pointer shadow-lg hover:shadow-yellow-700/40"
              >
                {t.continue[lang]}
                <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
              </button>
              <p className="text-brand-muted text-xs mt-4 flex items-center gap-2 justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-gold/70" />
                {t.disclaimer[lang]}
              </p>
            </div>
          </form>
          )}

          {step === 2 && (
            <div
              className="rounded-2xl p-6 md:p-10"
              style={{
                background: 'linear-gradient(135deg, rgba(20,18,15,0.95) 0%, rgba(10,10,10,0.95) 100%)',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 8px 60px rgba(0,0,0,0.5)',
              }}
            >
              <FoodPreferences
                lang={lang}
                isAr={isAr}
                selections={{ protein: food.protein, carbs: food.carbs, fats: food.fats }}
                others={{
                  proteinOther: food.proteinOther,
                  carbsOther: food.carbsOther,
                  fatsOther: food.fatsOther,
                }}
                errors={foodErrors}
                onToggle={toggleFood}
                onOtherChange={setFoodOther}
              />

              {/* Actions */}
              <div className="pt-8 mt-8 border-t border-white/5 flex flex-col sm:flex-row-reverse gap-3">
                <button
                  type="button"
                  onClick={handleSend}
                  className="flex-1 flex items-center justify-center gap-3 text-white font-bold px-8 py-4 rounded-full text-sm transition-all duration-300 hover:scale-[1.01] cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #1abe5a, #25D366)',
                    boxShadow: '0 8px 40px rgba(37,211,102,0.25)',
                  }}
                >
                  <Send className="w-4 h-4" />
                  {t.submit[lang]}
                </button>
                <button
                  type="button"
                  onClick={goBack}
                  className="sm:flex-none flex items-center justify-center gap-2 text-brand-light border border-[#2a2a2a] hover:border-brand-gold/50 hover:text-brand-gold font-semibold px-8 py-4 rounded-full text-sm transition-all duration-300 cursor-pointer"
                >
                  <ArrowLeft className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                  {t.back[lang]}
                </button>
              </div>

              <p className="text-brand-muted text-xs mt-4 flex items-center gap-2 justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-gold/70" />
                {t.disclaimer[lang]}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
