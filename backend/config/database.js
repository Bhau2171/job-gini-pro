const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../database/career_guidance.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Error opening database:', err.message);
    } else {
        console.log('✅ Connected to SQLite database.');
        initializeTables();
    }
});

function initializeTables() {
    db.serialize(() => {
        const tables = [
            `CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                first_name VARCHAR(100),
                last_name VARCHAR(100),
                domain VARCHAR(100),
                experience_level VARCHAR(50),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`,

            `CREATE TABLE IF NOT EXISTS user_profiles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER REFERENCES users(id),
                bio TEXT,
                location VARCHAR(100),
                phone VARCHAR(20),
                linkedin_url VARCHAR(255),
                github_url VARCHAR(255),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )`,

            `CREATE TABLE IF NOT EXISTS resumes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER REFERENCES users(id),
                resume_data TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )`,

            `CREATE TABLE IF NOT EXISTS market_insights (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                domain VARCHAR(100) NOT NULL,
                skill_demand_data TEXT,
                job_growth_data TEXT,
                salary_trends TEXT,
                recommendations TEXT,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`,

            `CREATE TABLE IF NOT EXISTS interview_questions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                domain VARCHAR(100) NOT NULL,
                question TEXT NOT NULL,
                answer_guide TEXT,
                difficulty_level VARCHAR(50),
                category VARCHAR(100)
            )`
        ];

        console.log('⚙️ Creating/verifying tables...');

        tables.forEach((table, index) => {
            db.run(table, (err) => {
                if (err) {
                    console.error(`❌ Error creating table ${index + 1}:`, err.message);
                } else {
                    console.log(`✅ Table ${index + 1} created/verified successfully`);
                }
            });
        });

        // Ensure foreign keys are enabled
        db.run("PRAGMA foreign_keys = ON;");

        // Insert data only after all tables are ready
        insertSampleData();
    });
}

function insertSampleData() {
    console.log('📊 Inserting sample data...');

    const sampleInsights = [
        {
            domain: 'AI',
            skill_demand_data: JSON.stringify({
                labels: ['Python', 'TensorFlow', 'PyTorch', 'MLOps', 'NLP'],
                data: [95, 85, 80, 75, 70]
            }),
            job_growth_data: JSON.stringify({
                labels: ['2020', '2021', '2022', '2023', '2024'],
                data: [100, 125, 150, 180, 220]
            }),
            salary_trends: JSON.stringify({
                labels: ['Entry', 'Mid', 'Senior', 'Lead'],
                data: [80000, 120000, 160000, 200000]
            }),
            recommendations: JSON.stringify([
                'Learn Python and deep learning frameworks',
                'Build projects with computer vision',
                'Study transformer architectures',
                'Practice MLOps tools like Docker and Kubernetes'
            ])
        },
        {
            domain: 'Web Development',
            skill_demand_data: JSON.stringify({
                labels: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'CSS'],
                data: [90, 85, 80, 75, 70]
            }),
            job_growth_data: JSON.stringify({
                labels: ['2020', '2021', '2022', '2023', '2024'],
                data: [100, 115, 130, 150, 175]
            }),
            salary_trends: JSON.stringify({
                labels: ['Entry', 'Mid', 'Senior', 'Lead'],
                data: [70000, 100000, 130000, 160000]
            }),
            recommendations: JSON.stringify([
                'Master JavaScript fundamentals and ES6+ features',
                'Learn React and state management',
                'Practice backend development with Node.js',
                'Understand databases and APIs'
            ])
        },
        {
            domain: 'Data Science',
            skill_demand_data: JSON.stringify({
                labels: ['Python', 'SQL', 'Machine Learning', 'Statistics', 'Data Visualization'],
                data: [90, 85, 80, 75, 70]
            }),
            job_growth_data: JSON.stringify({
                labels: ['2020', '2021', '2022', '2023', '2024'],
                data: [100, 120, 140, 165, 190]
            }),
            salary_trends: JSON.stringify({
                labels: ['Entry', 'Mid', 'Senior', 'Lead'],
                data: [85000, 110000, 140000, 170000]
            }),
            recommendations: JSON.stringify([
                'Learn Python for data analysis (Pandas, NumPy)',
                'Master SQL and database management',
                'Study machine learning algorithms',
                'Practice data visualization with tools like Tableau'
            ])
        }
    ];

    const sampleQuestions = [
        {
            domain: 'AI',
            question: 'Explain the difference between supervised and unsupervised learning',
            answer_guide: 'Supervised learning uses labeled data to train models for prediction, while unsupervised learning finds patterns in unlabeled data.',
            difficulty_level: 'Beginner',
            category: 'Machine Learning'
        },
        {
            domain: 'AI',
            question: 'What is overfitting and how can you prevent it?',
            answer_guide: 'Overfitting occurs when a model learns the training data too well, including noise. Prevent with cross-validation, regularization, and more data.',
            difficulty_level: 'Intermediate',
            category: 'Machine Learning'
        },
        {
            domain: 'Web Development',
            question: 'What is the virtual DOM in React?',
            answer_guide: 'The virtual DOM is a lightweight copy of the real DOM. React uses it to perform efficient updates by comparing virtual DOM trees.',
            difficulty_level: 'Beginner',
            category: 'Frontend'
        },
        {
            domain: 'Web Development',
            question: 'Explain RESTful API principles',
            answer_guide: 'REST APIs follow principles: statelessness, uniform interface, cacheability, client-server architecture, layered system.',
            difficulty_level: 'Intermediate',
            category: 'Backend'
        },
        {
            domain: 'Data Science',
            question: 'What is the difference between classification and regression?',
            answer_guide: 'Classification predicts categorical outcomes, regression predicts continuous numerical values.',
            difficulty_level: 'Beginner',
            category: 'Machine Learning'
        }
    ];

    db.serialize(() => {
        // Insert sample market insights
        sampleInsights.forEach(insight => {
            db.run(
                `INSERT OR IGNORE INTO market_insights 
                (domain, skill_demand_data, job_growth_data, salary_trends, recommendations)
                VALUES (?, ?, ?, ?, ?)`,
                [insight.domain, insight.skill_demand_data, insight.job_growth_data, insight.salary_trends, insight.recommendations]
            );
        });

        // Insert sample interview questions
        sampleQuestions.forEach(q => {
            db.run(
                `INSERT OR IGNORE INTO interview_questions 
                (domain, question, answer_guide, difficulty_level, category)
                VALUES (?, ?, ?, ?, ?)`,
                [q.domain, q.question, q.answer_guide, q.difficulty_level, q.category]
            );
        });

        console.log('✅ Sample data inserted successfully!');
    });
}

module.exports = db;
