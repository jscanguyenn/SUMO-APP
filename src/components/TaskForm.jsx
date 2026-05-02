import { useState } from 'react'

const SPECIALTIES = [
  'Cardiology', 'Endocrinology', 'Gastroenterology', 'Hematology/Oncology',
  'Nephrology', 'Pulmonology', 'Rheumatology', 'Allergy and Immunology',
  'Dermatology', 'OBGYN', 'General Surgery', 'Orthopedic Surgery',
  'Vascular Surgery', 'Thoracic and Cardiac Surgery', 'Neurosurgery',
  'Plastic/Reconstructive Surgery', 'Otolaryngology (ENT)', 'Ophthalmology',
  'Neurology', 'Psychiatry', 'Urology', 'Geriatric Medicine',
  'Physical Medicine and Rehabilitation (PM&R)',
]

const SCREENING_OPTIONS = [
  'DEXA (bone density scan)', 'Colonoscopy', 'Fecal Occult Blood Test (FOBT)',
  'Mammogram', 'Cervical Cancer Screening', 'Diabetic Eye Exam (Ophthalmologist)',
]

const IMAGING_TYPES = ['CT', 'MRI', 'X-ray', 'Ultrasound', 'PET']

const inputClass =
  'w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition'

const inputErr =
  'border-red-400 focus:ring-red-200 focus:border-red-400'

function Label({ children, required }) {
  return (
    <label className="block text-sm font-medium text-slate-700 mb-1">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  )
}

function FieldError({ show }) {
  if (!show) return null
  return <p className="text-xs text-red-500 mt-1">This field is required</p>
}

export default function TaskForm({ type, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    taskName: '',
    fasting: '',           // 'Fasting' | 'Non-fasting' | ''
    dueDate: '',
    orderingDoctor: '',
    notes: '',
    imagingTypes: [],
    officePhone: '',
    bodyParts: '',
    specialty: '',
    doctorName: '',
    phoneNumber: '',
    screeningType: '',
    prescriptionNames: '',
  })
  const [errors, setErrors] = useState({})

  const set = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: false }))
  }

  const toggleImagingType = (t) => {
    setForm(prev => ({
      ...prev,
      imagingTypes: prev.imagingTypes.includes(t)
        ? prev.imagingTypes.filter(x => x !== t)
        : [...prev.imagingTypes, t],
    }))
    if (errors.imagingTypes) setErrors(prev => ({ ...prev, imagingTypes: false }))
  }

  const validate = () => {
    const e = {}
    if (!form.taskName.trim()) e.taskName = true

    if (type === 'lab') {
      if (!form.fasting) e.fasting = true
      if (!form.dueDate) e.dueDate = true
      if (!form.orderingDoctor.trim()) e.orderingDoctor = true
    }
    if (type === 'imaging') {
      if (form.imagingTypes.length === 0) e.imagingTypes = true
      if (!form.dueDate) e.dueDate = true
      if (!form.orderingDoctor.trim()) e.orderingDoctor = true
    }
    if (type === 'referral') {
      if (!form.specialty) e.specialty = true
      if (!form.dueDate) e.dueDate = true
      if (!form.doctorName.trim()) e.doctorName = true
    }
    if (type === 'screening') {
      if (!form.screeningType) e.screeningType = true
      if (!form.dueDate) e.dueDate = true
    }
    if (type === 'prescription') {
      if (!form.prescriptionNames.trim()) e.prescriptionNames = true
    }
    if (type === 'callback') {
      if (!form.doctorName.trim()) e.doctorName = true
      if (!form.phoneNumber.trim()) e.phoneNumber = true
    }

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({ ...form, type })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      {/* Task Name — universal */}
      <div>
        <Label required>Task Name</Label>
        <input
          type="text"
          placeholder={
            type === 'lab' ? 'e.g. "Lipid Panel" or "CMP"' :
            type === 'imaging' ? 'e.g. "X-ray" or "Ultrasound"' :
            type === 'screening' ? 'e.g. "DEXA" or "Colonoscopy"' :
            type === 'referral' ? 'e.g. "Orthopedic Surgery" or "Dermatology"' :
            'Task Name'
          }
          value={form.taskName}
          onChange={set('taskName')}
          className={`${inputClass} ${errors.taskName ? inputErr : ''}`}
        />
        <FieldError show={errors.taskName} />
      </div>

      {/* ── LAB ── */}
      {type === 'lab' && <>
        <div>
          <Label required>Fasting</Label>
          <div className={`flex gap-4 mt-1 ${errors.fasting ? 'p-2 border border-red-400 rounded-lg' : ''}`}>
            {['Fasting', 'Non-fasting'].map(opt => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="fasting"
                  value={opt}
                  checked={form.fasting === opt}
                  onChange={() => {
                    setForm(prev => ({ ...prev, fasting: opt }))
                    if (errors.fasting) setErrors(prev => ({ ...prev, fasting: false }))
                  }}
                  className="accent-blue-600"
                />
                <span className="text-sm text-slate-700">{opt}</span>
              </label>
            ))}
          </div>
          <FieldError show={errors.fasting} />
        </div>
        <div>
          <Label required>Due Date</Label>
          <input type="date" value={form.dueDate} onChange={set('dueDate')}
            className={`${inputClass} ${errors.dueDate ? inputErr : ''}`} />
          <FieldError show={errors.dueDate} />
        </div>
        <div>
          <Label required>Ordering Doctor</Label>
          <input type="text" placeholder="Dr. Jane Smith" value={form.orderingDoctor} onChange={set('orderingDoctor')}
            className={`${inputClass} ${errors.orderingDoctor ? inputErr : ''}`} />
          <FieldError show={errors.orderingDoctor} />
        </div>
        <div>
          <Label>Notes</Label>
          <textarea rows={3} placeholder="Any additional notes…" value={form.notes} onChange={set('notes')}
            className={inputClass} />
        </div>
      </>}

      {/* ── IMAGING ── */}
      {type === 'imaging' && <>
        <div>
          <Label required>Imaging Type</Label>
          <div className={`flex flex-wrap gap-2 mt-1 ${errors.imagingTypes ? 'p-2 border border-red-400 rounded-lg' : ''}`}>
            {IMAGING_TYPES.map(t => (
              <button
                key={t}
                type="button"
                onClick={() => toggleImagingType(t)}
                className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                  form.imagingTypes.includes(t)
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <FieldError show={errors.imagingTypes} />
        </div>
        <div>
          <Label required>Due Date</Label>
          <input type="date" value={form.dueDate} onChange={set('dueDate')}
            className={`${inputClass} ${errors.dueDate ? inputErr : ''}`} />
          <FieldError show={errors.dueDate} />
        </div>
        <div>
          <Label required>Ordering Doctor</Label>
          <input type="text" placeholder="Dr. Jane Smith" value={form.orderingDoctor} onChange={set('orderingDoctor')}
            className={`${inputClass} ${errors.orderingDoctor ? inputErr : ''}`} />
          <FieldError show={errors.orderingDoctor} />
        </div>
        <div>
          <Label>Office Phone</Label>
          <input type="tel" placeholder="(555) 000-0000" value={form.officePhone} onChange={set('officePhone')}
            className={inputClass} />
        </div>
        <div>
          <Label>Body Part(s)</Label>
          <input type="text" placeholder="e.g. Chest, Abdomen" value={form.bodyParts} onChange={set('bodyParts')}
            className={inputClass} />
        </div>
        <div>
          <Label>Notes</Label>
          <textarea rows={3} placeholder="Any additional notes…" value={form.notes} onChange={set('notes')}
            className={inputClass} />
        </div>
      </>}

      {/* ── REFERRAL ── */}
      {type === 'referral' && <>
        <div>
          <Label required>Specialty</Label>
          <select value={form.specialty} onChange={set('specialty')}
            className={`${inputClass} ${errors.specialty ? inputErr : ''}`}>
            <option value="">Select specialty…</option>
            {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <FieldError show={errors.specialty} />
        </div>
        <div>
          <Label required>Due Date</Label>
          <input type="date" value={form.dueDate} onChange={set('dueDate')}
            className={`${inputClass} ${errors.dueDate ? inputErr : ''}`} />
          <FieldError show={errors.dueDate} />
        </div>
        <div>
          <Label required>Doctor Name</Label>
          <input type="text" placeholder="Dr. Jane Smith" value={form.doctorName} onChange={set('doctorName')}
            className={`${inputClass} ${errors.doctorName ? inputErr : ''}`} />
          <FieldError show={errors.doctorName} />
        </div>
        <div>
          <Label>Phone Number</Label>
          <input type="tel" placeholder="(555) 000-0000" value={form.phoneNumber} onChange={set('phoneNumber')}
            className={inputClass} />
        </div>
      </>}

      {/* ── SCREENING ── */}
      {type === 'screening' && <>
        <div>
          <Label required>Screening Type</Label>
          <select value={form.screeningType} onChange={set('screeningType')}
            className={`${inputClass} ${errors.screeningType ? inputErr : ''}`}>
            <option value="">Select screening…</option>
            {SCREENING_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <FieldError show={errors.screeningType} />
        </div>
        <div>
          <Label required>Due Date</Label>
          <input type="date" value={form.dueDate} onChange={set('dueDate')}
            className={`${inputClass} ${errors.dueDate ? inputErr : ''}`} />
          <FieldError show={errors.dueDate} />
        </div>
        <div>
          <Label>Ordering Doctor</Label>
          <input type="text" placeholder="Dr. Jane Smith" value={form.orderingDoctor} onChange={set('orderingDoctor')}
            className={inputClass} />
        </div>
        <div>
          <Label>Phone Number</Label>
          <input type="tel" placeholder="(555) 000-0000" value={form.phoneNumber} onChange={set('phoneNumber')}
            className={inputClass} />
        </div>
      </>}

      {/* ── PRESCRIPTION ── */}
      {type === 'prescription' && <>
        <div>
          <Label required>Prescription Name(s)</Label>
          <textarea
            rows={3}
            placeholder="e.g. Metformin 500mg, Lisinopril 10mg"
            value={form.prescriptionNames}
            onChange={set('prescriptionNames')}
            className={`${inputClass} ${errors.prescriptionNames ? inputErr : ''}`}
          />
          <FieldError show={errors.prescriptionNames} />
        </div>
      </>}

      {/* ── CALLBACK ── */}
      {type === 'callback' && <>
        <div>
          <Label required>Doctor Name</Label>
          <input type="text" placeholder="Dr. Jane Smith" value={form.doctorName} onChange={set('doctorName')}
            className={`${inputClass} ${errors.doctorName ? inputErr : ''}`} />
          <FieldError show={errors.doctorName} />
        </div>
        <div>
          <Label required>Phone Number</Label>
          <input type="tel" placeholder="(555) 000-0000" value={form.phoneNumber} onChange={set('phoneNumber')}
            className={`${inputClass} ${errors.phoneNumber ? inputErr : ''}`} />
          <FieldError show={errors.phoneNumber} />
        </div>
      </>}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 border border-slate-200 text-slate-600 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors"
        >
          Add Task
        </button>
      </div>
    </form>
  )
}
