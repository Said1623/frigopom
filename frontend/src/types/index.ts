export interface Client {
  id: number;
  nom: string;
  adresse?: string;
  telephone?: string;
  email?: string;
  actif: boolean;
}

export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: 'super_admin' | 'admin' | 'operateur' | 'lecteur';
  client_id?: number;
  client?: Client;
}

export interface UnitesFrigo {
  id: number;
  nom: string;
  adresse?: string;
  description?: string;
  nombre_chambres: number;
  source_donnees: 'manuel' | 'automate';
  automate_url?: string;
  client_id: number;
  client?: Client;
  chambres?: Chambre[];
}

export interface ConfigChambre {
  id: number;
  chambre_id: number;
  temp_consigne: number;
  temp_min: number;
  temp_max: number;
  hum_consigne: number;
  hum_min: number;
  hum_max: number;
  co2_consigne: number;
  co2_min: number;
  co2_max: number;
  o2_consigne?: number;
  o2_min?: number;
  o2_max?: number;
  alarme_temp_haute: number;
  alarme_temp_basse: number;
  alarme_hum_basse: number;
  alarme_co2_haute: number;
}

export interface Chambre {
  id: number;
  numero: number;
  nom: string;
  volume_m3?: number;
  capacite_palettes?: number;
  type_atmosphere: 'AC' | 'ULO' | 'Standard';
  active: boolean;
  unite_id: number;
  config?: ConfigChambre;
  derniere_mesure?: Mesure;
}

export interface Mesure {
  id: number;
  chambre_id: number;
  temperature?: number;
  humidite?: number;
  co2?: number;
  o2?: number;
  ethylene?: number;
  source: 'manuel' | 'automate';
  operateur?: string;
  notes?: string;
  horodatage: string;
}

export interface Alarme {
  id: number;
  chambre_id: number;
  chambre?: Chambre;
  type: string;
  niveau: 'critique' | 'avertissement' | 'info';
  message: string;
  valeur_mesuree?: number;
  seuil?: number;
  acquittee: boolean;
  acquittee_par?: string;
  acquittee_at?: string;
  declenchee_at: string;
}

export interface Stock {
  id: number;
  chambre_id: number;
  chambre?: Chambre;
  client_nom: string;
  variete: string;
  nb_palettes: number;
  poids_tonnes: number;
  date_entree?: string;
  date_sortie_prevue?: string;
  statut: 'en_stock' | 'sorti' | 'reserve';
  notes?: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
}
