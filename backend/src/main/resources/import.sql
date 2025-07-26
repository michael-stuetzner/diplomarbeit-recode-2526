-- Insert sample UserData records

INSERT INTO user_data (
    chatStartTime,
    chatEndTime,
    userName,
    userRole,
    requestedDownload,
    FeedbackRating,
    messageCount,
    feedbackMessage
) VALUES
      ('2025-07-26 10:00:00', '2025-07-26 10:05:00', 'Anna', 'JOBSEEKER', true, 5, 12, 'Sehr hilfreich, danke!'),

      ('2025-07-26 10:10:00', '2025-07-26 10:14:30', 'Tobias', 'CATERING', false, 4, 8, 'Etwas unklar, aber nett'),

      ('2025-07-26 11:00:00', '2025-07-26 11:02:00', 'Lea', 'JOBSEEKER', true, 3, 5, 'Okay, aber könnte schneller sein.'),

      ('2025-07-26 11:30:00', '2025-07-26 11:36:10', 'Max', 'JOBSEEKER', true, 5, 15, 'Top! Super einfach erklärt.'),

      ('2025-07-26 11:40:00', '2025-07-26 11:43:50', 'Julia', 'CATERING', false, 2, 4, 'Ich habe nicht ganz verstanden, wie ich starten kann.'),

      ('2025-07-26 12:00:00', '2025-07-26 12:07:00', 'David', 'JOBSEEKER', true, 4, 10, 'Ziemlich hilfreich, danke.'),

      ('2025-07-26 12:15:00', '2025-07-26 12:20:45', 'Sophie', 'CATERING', true, 5, 9, 'Genau das, was ich gesucht habe.'),

      ('2025-07-26 12:30:00', '2025-07-26 12:35:00', 'Lukas', 'JOBSEEKER', false, 3, 7, 'War in Ordnung, aber etwas zu viele Schritte.'),

      ('2025-07-26 13:00:00', '2025-07-26 13:05:00', 'Miriam', 'CATERING', false, 1, 3, 'Nicht hilfreich, bitte verbessern.'),

      ('2025-07-26 13:30:00', '2025-07-26 13:33:30', 'Jonas', 'JOBSEEKER', true, 5, 11, 'Einfach und gut verständlich.');
