import { useLanguage } from '../i18n'

// Clases de Devicon (https://devicons.io). Sin icono en la librería → se muestra un asterisco.
const skills = [
  { name: 'JavaScript', icons: ['devicon-javascript-plain'] },
  { name: 'React', icons: ['devicon-react-original'] },
  { name: 'Node.js', icons: ['devicon-nodejs-plain'] },
  { name: 'Express', icons: ['devicon-express-original'] },
  { name: 'Python', icons: ['devicon-python-plain'] },
  { name: 'Flask', icons: ['devicon-flask-original'] },
  { name: 'C++', icons: ['devicon-cplusplus-plain'] },
  { name: 'SQLAlchemy', icons: ['devicon-sqlalchemy-plain'] },
  { name: 'SQL', icons: [] },
  { name: 'MongoDB', icons: ['devicon-mongodb-plain'] },
  { name: 'JWT', icons: [] },
  { name: 'Jest', icons: ['devicon-jest-plain'] },
  { name: 'Git', icons: ['devicon-git-plain'] },
  { name: 'HTML/CSS', icons: ['devicon-html5-plain', 'devicon-css3-plain'] },
  { name: 'Bootstrap', icons: ['devicon-bootstrap-plain'] },
  { name: 'TypeScript', icons: ['devicon-typescript-plain'] },
  { name: 'IA / LLM', icons: [] },
]

function Skills() {
  const { t } = useLanguage()

  return (
    <section id="skills" className="section section-dark">
      <div className="section-inner split">
        <div>
          <p className="eyebrow">{t.skills.eyebrow}</p>
          <h2 className="display">{t.skills.title}</h2>
        </div>
        <ul className="skill-list">
          {skills.map((skill) => (
            <li key={skill.name}>
              <span className="skill-icons" aria-hidden="true">
                {skill.icons.length > 0
                  ? skill.icons.map((icon) => <i key={icon} className={`${icon} colored`} />)
                  : <span className="skill-icon-fallback">*</span>}
              </span>
              {skill.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Skills
