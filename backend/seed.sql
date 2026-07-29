-- ============================================
-- FrigoPom — Seed initial
-- À exécuter dans Neon SQL Editor après démarrage du backend
-- ============================================

-- Super admin (mot de passe: Admin1234!)
INSERT INTO users (nom, prenom, email, password, role, actif)
VALUES (
  'Admin', 'Super',
  'admin@frigopom.app',
  '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uXKLGTUGa',
  'super_admin',
  true
) ON CONFLICT (email) DO NOTHING;

-- Client démo
INSERT INTO clients (nom, adresse, email, telephone, actif)
VALUES (
  'Coopérative Rif Fruits',
  'Route de Tétouan, Al Hoceima, Maroc',
  'contact@riffruits.ma',
  '+212 539 000 000',
  true
) ON CONFLICT DO NOTHING;

-- Note: Après ce seed, connectez-vous avec admin@frigopom.app / Admin1234!
-- puis créez vos unités et chambres via l'interface.
