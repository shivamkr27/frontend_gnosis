const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'questions');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

const subjectsMap = {}; // subject_name -> { levels: { [level_number]: topic } }

files.forEach(file => {
  const content = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf-8'));
  if (content.length > 0) {
    const q = content[0];
    const subName = q.subject_name;
    const lvlNum = q.level_number;
    const topic = q.level_topic;

    if (!subjectsMap[subName]) {
      subjectsMap[subName] = { levels: {} };
    }
    subjectsMap[subName].levels[lvlNum] = topic;
  }
});

let sql = `-- SUBJECTS insert\nINSERT INTO subjects (name, description, order_index) VALUES\n`;
let subjectIndex = 1;
const subjectNames = Object.keys(subjectsMap);

const subjectsValues = subjectNames.map(name => {
  return `('${name.replace(/'/g, "''")}', 'Description for ${name.replace(/'/g, "''")}', ${subjectIndex++})`;
}).join(',\n');

sql += subjectsValues + `\nON CONFLICT (order_index) DO NOTHING;\n\n`;

sql += `-- LEVELS insert\nINSERT INTO levels (subject_id, level_number, topic, xp_reward)\n`;
let firstLevel = true;

subjectNames.forEach(subName => {
  const levels = subjectsMap[subName].levels;
  Object.keys(levels).forEach(lvlNum => {
    const topic = levels[lvlNum];
    let xp = 100;
    if (lvlNum == 2) xp = 150;
    if (lvlNum == 3) xp = 200;
    if (lvlNum == 4) xp = 250;

    if (!firstLevel) {
      sql += `UNION ALL\n`;
    }
    firstLevel = false;

    sql += `SELECT id, ${lvlNum}, '${topic.replace(/'/g, "''")}', ${xp} FROM subjects WHERE name = '${subName.replace(/'/g, "''")}'\n`;
  });
});

sql += `ON CONFLICT DO NOTHING; -- assuming standard conflict handling or adjust as needed\n`;

fs.writeFileSync(path.join(__dirname, 'init_db.sql'), sql);
console.log('Generated init_db.sql with ' + subjectNames.length + ' subjects.');
