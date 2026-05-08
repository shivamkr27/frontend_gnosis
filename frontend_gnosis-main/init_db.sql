-- SUBJECTS insert
INSERT INTO subjects (name, description, order_index) VALUES
('AWS Cloud Mastery', 'Description for AWS Cloud Mastery', 1),
('CI/CD & GitOps', 'Description for CI/CD & GitOps', 2),
('COA', 'Description for COA', 3),
('Cryptography (Ciphers & Numericals)', 'Description for Cryptography (Ciphers & Numericals)', 4),
('C Programming', 'Description for C Programming', 5),
('Algorithms (DAA)', 'Description for Algorithms (DAA)', 6),
('DBMS', 'Description for DBMS', 7),
('Computer Networks (DCN)', 'Description for Computer Networks (DCN)', 8),
('DevSecOps', 'Description for DevSecOps', 9),
('Microprocessors', 'Description for Microprocessors', 10),
('Docker & Containers', 'Description for Docker & Containers', 11),
('Data Structures', 'Description for Data Structures', 12),
('Discrete Mathematics', 'Description for Discrete Mathematics', 13),
('Java Development', 'Description for Java Development', 14),
('Java Programming', 'Description for Java Programming', 15),
('Kubernetes (K8s)', 'Description for Kubernetes (K8s)', 16),
('Linux', 'Description for Linux', 17),
('Logical Reasoning', 'Description for Logical Reasoning', 18),
('Object Oriented Design (OOAD)', 'Description for Object Oriented Design (OOAD)', 19),
('Operating Systems (OS)', 'Description for Operating Systems (OS)', 20),
('Python Programming', 'Description for Python Programming', 21),
('Quantitative Ability', 'Description for Quantitative Ability', 22),
('Software Engineering', 'Description for Software Engineering', 23),
('System Design', 'Description for System Design', 24),
('Terraform (IaC)', 'Description for Terraform (IaC)', 25),
('TOC', 'Description for TOC', 26)
ON CONFLICT (order_index) DO NOTHING;

-- LEVELS insert
INSERT INTO levels (subject_id, level_number, topic, xp_reward)
SELECT id, 1, 'Intro to AWS', 100 FROM subjects WHERE name = 'AWS Cloud Mastery'
UNION ALL
SELECT id, 2, 'IAM Policies', 150 FROM subjects WHERE name = 'AWS Cloud Mastery'
UNION ALL
SELECT id, 3, 'VPC Networking', 200 FROM subjects WHERE name = 'AWS Cloud Mastery'
UNION ALL
SELECT id, 4, 'Advanced VPC Architecture', 250 FROM subjects WHERE name = 'AWS Cloud Mastery'
UNION ALL
SELECT id, 1, 'Pipelines', 100 FROM subjects WHERE name = 'CI/CD & GitOps'
UNION ALL
SELECT id, 2, 'Git Branching Strategies', 150 FROM subjects WHERE name = 'CI/CD & GitOps'
UNION ALL
SELECT id, 3, 'Advanced GitOps', 200 FROM subjects WHERE name = 'CI/CD & GitOps'
UNION ALL
SELECT id, 4, 'Chaos Engineering', 250 FROM subjects WHERE name = 'CI/CD & GitOps'
UNION ALL
SELECT id, 1, 'Digital Logic', 100 FROM subjects WHERE name = 'COA'
UNION ALL
SELECT id, 2, 'Memory Hierarchy', 150 FROM subjects WHERE name = 'COA'
UNION ALL
SELECT id, 3, 'CPU Components', 200 FROM subjects WHERE name = 'COA'
UNION ALL
SELECT id, 4, 'I/O Organization', 250 FROM subjects WHERE name = 'COA'
UNION ALL
SELECT id, 1, 'Topic 1', 100 FROM subjects WHERE name = 'Cryptography (Ciphers & Numericals)'
UNION ALL
SELECT id, 2, 'Topic 1', 150 FROM subjects WHERE name = 'Cryptography (Ciphers & Numericals)'
UNION ALL
SELECT id, 3, 'Topic 1', 200 FROM subjects WHERE name = 'Cryptography (Ciphers & Numericals)'
UNION ALL
SELECT id, 4, 'Topic 1', 250 FROM subjects WHERE name = 'Cryptography (Ciphers & Numericals)'
UNION ALL
SELECT id, 1, 'Memory Layout, Storage Classes, Operator Precedence', 100 FROM subjects WHERE name = 'C Programming'
UNION ALL
SELECT id, 2, 'Pointer Arithmetic, Array-Pointer duality, Function Pointers', 150 FROM subjects WHERE name = 'C Programming'
UNION ALL
SELECT id, 3, 'Dynamic Memory Allocation, File I/O', 200 FROM subjects WHERE name = 'C Programming'
UNION ALL
SELECT id, 4, 'Structures, Unions, Bit-fields, Hardware Interfacing', 250 FROM subjects WHERE name = 'C Programming'
UNION ALL
SELECT id, 1, 'Big O Notation', 100 FROM subjects WHERE name = 'Algorithms (DAA)'
UNION ALL
SELECT id, 2, 'Sorting Patterns', 150 FROM subjects WHERE name = 'Algorithms (DAA)'
UNION ALL
SELECT id, 3, 'Advanced DP', 200 FROM subjects WHERE name = 'Algorithms (DAA)'
UNION ALL
SELECT id, 4, 'P vs NP', 250 FROM subjects WHERE name = 'Algorithms (DAA)'
UNION ALL
SELECT id, 1, 'ER Modeling', 100 FROM subjects WHERE name = 'DBMS'
UNION ALL
SELECT id, 2, 'Normalization', 150 FROM subjects WHERE name = 'DBMS'
UNION ALL
SELECT id, 3, 'Indexing', 200 FROM subjects WHERE name = 'DBMS'
UNION ALL
SELECT id, 4, 'Distributed Databases', 250 FROM subjects WHERE name = 'DBMS'
UNION ALL
SELECT id, 1, 'OSI Model', 100 FROM subjects WHERE name = 'Computer Networks (DCN)'
UNION ALL
SELECT id, 2, 'Data Link Layer', 150 FROM subjects WHERE name = 'Computer Networks (DCN)'
UNION ALL
SELECT id, 3, 'TCP Congestion Control', 200 FROM subjects WHERE name = 'Computer Networks (DCN)'
UNION ALL
SELECT id, 4, 'Advanced TCP', 250 FROM subjects WHERE name = 'Computer Networks (DCN)'
UNION ALL
SELECT id, 1, 'Security Basics', 100 FROM subjects WHERE name = 'DevSecOps'
UNION ALL
SELECT id, 2, 'Security Scanning', 150 FROM subjects WHERE name = 'DevSecOps'
UNION ALL
SELECT id, 3, 'Security in Pipelines', 200 FROM subjects WHERE name = 'DevSecOps'
UNION ALL
SELECT id, 4, 'Advanced Application Security', 250 FROM subjects WHERE name = 'DevSecOps'
UNION ALL
SELECT id, 1, '8085 Architecture', 100 FROM subjects WHERE name = 'Microprocessors'
UNION ALL
SELECT id, 2, 'Addressing Modes', 150 FROM subjects WHERE name = 'Microprocessors'
UNION ALL
SELECT id, 3, 'Interrupts', 200 FROM subjects WHERE name = 'Microprocessors'
UNION ALL
SELECT id, 4, '8086 Architecture', 250 FROM subjects WHERE name = 'Microprocessors'
UNION ALL
SELECT id, 1, 'Docker Basics', 100 FROM subjects WHERE name = 'Docker & Containers'
UNION ALL
SELECT id, 2, 'Networking', 150 FROM subjects WHERE name = 'Docker & Containers'
UNION ALL
SELECT id, 3, 'Docker Swarm', 200 FROM subjects WHERE name = 'Docker & Containers'
UNION ALL
SELECT id, 4, 'Architecture', 250 FROM subjects WHERE name = 'Docker & Containers'
UNION ALL
SELECT id, 1, 'Basics & Big-O', 100 FROM subjects WHERE name = 'Data Structures'
UNION ALL
SELECT id, 2, 'Trees, Heaps & Hashing', 150 FROM subjects WHERE name = 'Data Structures'
UNION ALL
SELECT id, 3, 'Dynamic Programming & Graphs', 200 FROM subjects WHERE name = 'Data Structures'
UNION ALL
SELECT id, 4, 'Expert Algorithms & String Theory', 250 FROM subjects WHERE name = 'Data Structures'
UNION ALL
SELECT id, 1, 'Set Theory', 100 FROM subjects WHERE name = 'Discrete Mathematics'
UNION ALL
SELECT id, 2, 'Combinatorics', 150 FROM subjects WHERE name = 'Discrete Mathematics'
UNION ALL
SELECT id, 3, 'Graph Theory', 200 FROM subjects WHERE name = 'Discrete Mathematics'
UNION ALL
SELECT id, 4, 'Recurrence Relations', 250 FROM subjects WHERE name = 'Discrete Mathematics'
UNION ALL
SELECT id, 1, 'JVM Architecture, Bytecode, Wrapper Classes', 100 FROM subjects WHERE name = 'Java Development'
UNION ALL
SELECT id, 2, 'OOPs (Inheritance, Polymorphism, Abstraction, Interfaces), Exception Handling', 150 FROM subjects WHERE name = 'Java Programming'
UNION ALL
SELECT id, 3, 'Collections Framework (List, Set, Map, Queue), Generics', 200 FROM subjects WHERE name = 'Java Programming'
UNION ALL
SELECT id, 4, 'Multithreading, Java 8 Features (Lambda, Streams, Optional), File I/O (NIO.2)', 250 FROM subjects WHERE name = 'Java Programming'
UNION ALL
SELECT id, 1, 'K8s Architecture', 100 FROM subjects WHERE name = 'Kubernetes (K8s)'
UNION ALL
SELECT id, 2, 'Pod Lifecycle', 150 FROM subjects WHERE name = 'Kubernetes (K8s)'
UNION ALL
SELECT id, 3, 'Advanced Scheduling', 200 FROM subjects WHERE name = 'Kubernetes (K8s)'
UNION ALL
SELECT id, 4, 'Advanced Architecture', 250 FROM subjects WHERE name = 'Kubernetes (K8s)'
UNION ALL
SELECT id, 1, 'Basic Commands', 100 FROM subjects WHERE name = 'Linux'
UNION ALL
SELECT id, 2, 'Redirection', 150 FROM subjects WHERE name = 'Linux'
UNION ALL
SELECT id, 3, 'Shell Scripting', 200 FROM subjects WHERE name = 'Linux'
UNION ALL
SELECT id, 4, 'Process Management', 250 FROM subjects WHERE name = 'Linux'
UNION ALL
SELECT id, 1, 'Series', 100 FROM subjects WHERE name = 'Logical Reasoning'
UNION ALL
SELECT id, 2, 'Topic 1', 150 FROM subjects WHERE name = 'Logical Reasoning'
UNION ALL
SELECT id, 3, 'Topic 1', 200 FROM subjects WHERE name = 'Logical Reasoning'
UNION ALL
SELECT id, 4, 'Topic 1', 250 FROM subjects WHERE name = 'Logical Reasoning'
UNION ALL
SELECT id, 1, 'SOLID Principles', 100 FROM subjects WHERE name = 'Object Oriented Design (OOAD)'
UNION ALL
SELECT id, 2, 'Topic 1', 150 FROM subjects WHERE name = 'Object Oriented Design (OOAD)'
UNION ALL
SELECT id, 3, 'Topic 1', 200 FROM subjects WHERE name = 'Object Oriented Design (OOAD)'
UNION ALL
SELECT id, 4, 'Topic 1', 250 FROM subjects WHERE name = 'Object Oriented Design (OOAD)'
UNION ALL
SELECT id, 1, 'OS Basics', 100 FROM subjects WHERE name = 'Operating Systems (OS)'
UNION ALL
SELECT id, 2, 'Scheduling Algorithms', 150 FROM subjects WHERE name = 'Operating Systems (OS)'
UNION ALL
SELECT id, 3, 'Paging', 200 FROM subjects WHERE name = 'Operating Systems (OS)'
UNION ALL
SELECT id, 4, 'Advanced Scheduling', 250 FROM subjects WHERE name = 'Operating Systems (OS)'
UNION ALL
SELECT id, 1, 'Basics & Data Types', 100 FROM subjects WHERE name = 'Python Programming'
UNION ALL
SELECT id, 2, 'Intermediate Concepts', 150 FROM subjects WHERE name = 'Python Programming'
UNION ALL
SELECT id, 3, 'OOP & Advanced Structures', 200 FROM subjects WHERE name = 'Python Programming'
UNION ALL
SELECT id, 4, 'Expert Internals & Async', 250 FROM subjects WHERE name = 'Python Programming'
UNION ALL
SELECT id, 1, 'Numbers', 100 FROM subjects WHERE name = 'Quantitative Ability'
UNION ALL
SELECT id, 2, 'Topic 1', 150 FROM subjects WHERE name = 'Quantitative Ability'
UNION ALL
SELECT id, 3, 'Topic 1', 200 FROM subjects WHERE name = 'Quantitative Ability'
UNION ALL
SELECT id, 4, 'Topic 1', 250 FROM subjects WHERE name = 'Quantitative Ability'
UNION ALL
SELECT id, 1, 'SDLC Models', 100 FROM subjects WHERE name = 'Software Engineering'
UNION ALL
SELECT id, 2, 'Testing Levels', 150 FROM subjects WHERE name = 'Software Engineering'
UNION ALL
SELECT id, 3, 'Design Patterns', 200 FROM subjects WHERE name = 'Software Engineering'
UNION ALL
SELECT id, 4, 'Software Metrics', 250 FROM subjects WHERE name = 'Software Engineering'
UNION ALL
SELECT id, 1, 'Vertical Scaling', 100 FROM subjects WHERE name = 'System Design'
UNION ALL
SELECT id, 2, 'CAP Theorem', 150 FROM subjects WHERE name = 'System Design'
UNION ALL
SELECT id, 3, 'Distributed Consensus', 200 FROM subjects WHERE name = 'System Design'
UNION ALL
SELECT id, 4, 'Architecture at Scale', 250 FROM subjects WHERE name = 'System Design'
UNION ALL
SELECT id, 1, 'Topic 1', 100 FROM subjects WHERE name = 'Terraform (IaC)'
UNION ALL
SELECT id, 2, 'Topic 1', 150 FROM subjects WHERE name = 'Terraform (IaC)'
UNION ALL
SELECT id, 3, 'Topic 1', 200 FROM subjects WHERE name = 'Terraform (IaC)'
UNION ALL
SELECT id, 4, 'Topic 1', 250 FROM subjects WHERE name = 'Terraform (IaC)'
UNION ALL
SELECT id, 1, 'Finite Automata', 100 FROM subjects WHERE name = 'TOC'
UNION ALL
SELECT id, 2, 'Context-Free Languages', 150 FROM subjects WHERE name = 'TOC'
UNION ALL
SELECT id, 3, 'Turing Machines', 200 FROM subjects WHERE name = 'TOC'
UNION ALL
SELECT id, 4, 'Undecidability', 250 FROM subjects WHERE name = 'TOC'
ON CONFLICT DO NOTHING; -- assuming standard conflict handling or adjust as needed
