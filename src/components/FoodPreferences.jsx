// src/components/FoodPreferences.jsx
import { Check } from 'lucide-react';
import { content } from '../content/content';

const inputWrap = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.06)',
};

function SectionTitle({ children }) {
  return (
    <h3 className="text-brand-gold text-xs font-black tracking-widest uppercase mb-4 mt-2 flex items-center gap-2">
      <span className="w-6 h-px bg-brand-gold/40" />
      {children}
    </h3>
  );
}

/**
 * Presentational food-preferences step.
 * State is owned by IntakePage; this component only renders and reports changes.
 *
 * Props:
 *  - lang, isAr
 *  - selections: { protein: string[], carbs: string[], fats: string[] }
 *  - others:     { proteinOther, carbsOther, fatsOther }
 *  - errors:     { [categoryId]: boolean }  // true = show inline validation
 *  - onToggle(categoryId, optionId)
 *  - onOtherChange(categoryId, value)
 */
export default function FoodPreferences({
  lang,
  isAr,
  selections,
  others,
  errors,
  onToggle,
  onOtherChange,
}) {
  const t = content.foodPrefs;

  return (
    <div className="space-y-9">
      <p className="text-brand-muted text-xs leading-relaxed">
        {t.selectHint[lang]}
      </p>

      {t.categories.map((cat) => {
        const selected = selections[cat.id] || [];
        const otherKey = `${cat.id}Other`;
        const otherVal = others[otherKey] || '';
        const hasError = !!errors?.[cat.id];

        return (
          <div key={cat.id}>
            <SectionTitle>{cat.title[lang]}</SectionTitle>

            {/* Multi-select pills */}
            <div className="flex flex-wrap gap-2">
              {cat.options.map((opt) => {
                const active = selected.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => onToggle(cat.id, opt.id)}
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
                      active
                        ? 'bg-brand-gold text-brand-bg border-brand-gold shadow-lg shadow-yellow-700/30'
                        : 'border-[#2a2a2a] text-brand-muted hover:border-brand-gold/50 hover:text-brand-light'
                    }`}
                  >
                    {active && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
                    {opt[lang]}
                  </button>
                );
              })}
            </div>

            {/* Other free-text */}
            <div className="mt-4">
              <label className="text-brand-muted text-[11px] font-semibold tracking-wider uppercase block mb-2">
                {t.otherLabel[lang]}{' '}
                <span className="text-brand-muted/60 normal-case font-normal">
                  {content.intake.optional[lang]}
                </span>
              </label>
              <div
                className="rounded-xl px-4 py-3 transition-all duration-200 focus-within:border-brand-gold/30"
                style={inputWrap}
              >
                <input
                  type="text"
                  value={otherVal}
                  onChange={(e) => onOtherChange(cat.id, e.target.value)}
                  placeholder={t.otherPlaceholder[lang]}
                  dir={isAr ? 'rtl' : 'ltr'}
                  className="bg-transparent w-full text-brand-white text-sm placeholder:text-brand-muted/40 focus:outline-none"
                />
              </div>
            </div>

            {/* Inline validation */}
            {hasError && (
              <p
                className="text-red-400 text-xs mt-2 flex items-center gap-1.5"
                role="alert"
                dir={isAr ? 'rtl' : 'ltr'}
              >
                <span className="w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                {t.validationCategory[lang]}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
