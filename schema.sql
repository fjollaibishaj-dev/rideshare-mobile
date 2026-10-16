
CREATE TABLE IF NOT EXISTS udhetimet (
    id INTEGER PRIMARY KEY,
    nisja TEXT NOT NULL,
    destinacioni TEXT NOT NULL,
    ora TEXT NOT NULL,
    vendtakimi TEXT NOT NULL,
    vende INTEGER NOT NULL
);

INSERT INTO udhetimet (id, nisja, destinacioni, ora, vendtakimi, vende)
VALUES
    (1, 'Prishtinë', 'AAB', '08:00', 'Stacioni i autobusëve', 2),
    (2, 'Fushë Kosovë', 'AAB', '08:15', 'Te stacioni kryesor', 1),
    (3, 'Lipjan', 'AAB', '07:45', 'Qendra e qytetit', 0)
ON CONFLICT (id) DO NOTHING;
