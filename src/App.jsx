import { useMemo, useState } from "react";

const initialStudents = [
  { id: 1, firstName: "Aarav", lastName: "Sharma", email: "aarav@example.com", age: 20, course: "B.Tech CSE" },
  { id: 2, firstName: "Priya", lastName: "Verma", email: "priya@example.com", age: 21, course: "B.Tech IT" },
];

function App() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", age: "", course: "B.Tech CSE" });

  const filteredStudents = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return students;
    return students.filter((s) =>
      [s.firstName, s.lastName, s.email, s.course].some((v) => v.toLowerCase().includes(q))
    );
  }, [students, search]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.age) return;
    setStudents([...students, { ...form, id: Date.now(), age: Number(form.age) }]);
    setForm({ firstName: "", lastName: "", email: "", age: "", course: "B.Tech CSE" });
  };

  const removeStudent = (id) => setStudents(students.filter((s) => s.id !== id));

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">Nikhil Goyal • B.Tech CSE</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Student Management System</h1>
          <p className="mt-3 max-w-2xl text-slate-400">Manage student records with a simple, responsive React interface.</p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            <h2 className="mb-5 text-xl font-semibold">Add Student</h2>
            <div className="space-y-4">
              {[
                ["firstName", "First Name", "text"],
                ["lastName", "Last Name", "text"],
                ["email", "Email", "email"],
                ["age", "Age", "number"],
              ].map(([name, label, type]) => (
                <label key={name} className="block text-sm text-slate-300">
                  {label}
                  <input required name={name} type={type} value={form[name]} onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 outline-none transition focus:border-cyan-400" />
                </label>
              ))}
              <label className="block text-sm text-slate-300">
                Course
                <select name="course" value={form.course} onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 outline-none focus:border-cyan-400">
                  <option>B.Tech CSE</option><option>B.Tech IT</option><option>BCA</option><option>MCA</option>
                </select>
              </label>
              <button className="w-full rounded-lg bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400" type="submit">
                + Add Student
              </button>
            </div>
          </form>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Student Records</h2>
                <p className="text-sm text-slate-400">{students.length} total students</p>
              </div>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students..."
                className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 outline-none focus:border-cyan-400 sm:w-64" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead className="border-b border-slate-800 text-slate-400">
                  <tr><th className="px-3 py-3">Name</th><th className="px-3 py-3">Email</th><th className="px-3 py-3">Age</th><th className="px-3 py-3">Course</th><th className="px-3 py-3">Action</th></tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b border-slate-800/70">
                      <td className="px-3 py-4 font-medium">{student.firstName} {student.lastName}</td>
                      <td className="px-3 py-4 text-slate-400">{student.email}</td>
                      <td className="px-3 py-4">{student.age}</td>
                      <td className="px-3 py-4 text-cyan-400">{student.course}</td>
                      <td className="px-3 py-4"><button onClick={() => removeStudent(student.id)} className="rounded-md px-3 py-1.5 text-red-400 hover:bg-red-400/10">Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!filteredStudents.length && <p className="py-10 text-center text-slate-500">No students found.</p>}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

export default App;
