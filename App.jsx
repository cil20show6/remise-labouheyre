import { useState, useMemo } from "react";

const ENGINS = [
  { id: 1,  nom: "FPTL",      type: "Fourgon Pompe Tonne Léger" },
  { id: 2,  nom: "CCFS",      type: "Camion Citerne Feux de Forêt Super" },
  { id: 3,  nom: "CCFM6 601", type: "Camion Citerne Feux de Forêt Moyen" },
  { id: 4,  nom: "CCFM6 604", type: "Camion Citerne Feux de Forêt Moyen" },
  { id: 5,  nom: "VLHR",      type: "Véhicule Léger Hors Route" },
  { id: 6,  nom: "VSRM",      type: "Véhicule Secours Routier Moyen" },
  { id: 7,  nom: "MPRI",      type: "Motopompe Remorquable Incendie", freq: "hebdo" },
  { id: 8,  nom: "VSAV 1",    type: "Véhicule Secours et Assistance aux Victimes" },
  { id: 9,  nom: "VSAV 2",    type: "Véhicule Secours et Assistance aux Victimes" },
  { id: 10, nom: "VTU-A",     type: "Véhicule Tout Usage Administratif" },
  { id: 11, nom: "MPR",       type: "Motopompe Remorquable", freq: "hebdo" },
  { id: 12, nom: "VLR",       type: "Véhicule Léger de Reconnaissance" },
];

const CHECKLIST_BASE = {
  1: { // FPTL
    "Cabine & Documents": [
      "Kilométrage noté", "Niveau carburant GASOIL", "Niveau AD BLUE",
      "1 Boite d'ampoules", "1 Boite de fusibles", "1 GHV (côté conducteur)",
      "1 Lutin DECI/DFCI", "1 Plaquette C.A", "1 Parcellaire urbain",
      "1 Atlas plan ETARE", "1 Dossier accidents de service", "1 Clé autoroute A65",
      "1 Carte carburant",
    ],
    "Dans la cabine": [
      "3 GHV", "1 Trousse à outils", "1 Boite d'ampoules", "2 Triangles",
      "1 Bouteille d'air", "4 Demi-masques", "1 Radio ANTARES", "2 Poignées vannes démontées",
    ],
    "Arrière cabine": [
      "4 ARI + 4 Bouteilles", "4 GHV", "1 Tri flashs", "1 Coupe boulons",
      "2 Extincteurs poudre 9 kg", "1 Halligan tool + Masse", "2 Commandes", "4 Cônes de Lubeck",
    ],
    "Sous le siège": [
      "1 Fourche", "1 Cric", "1 Cordage", "1 Béquille de cabine",
      "1 Lot feu de cheminé", "1 Pioche", "1 Extincteur CO2", "1 Pelle",
      "1 Balai de cantonnier", "1 Rallonge air comprimé",
    ],
    "Arrière Droit": [
      "1 Raccord 2m LDT", "1 Sac PS", "2 Lots LSPCC", "4 Lots NRBC",
      "7 tuyaux Ø45mm - 20m", "1 LDV 500", "1 LDV 1000", "1 Lance à mousse",
      "1 Injecteur proportionneur", "2 Tuyaux semi-rigides pour injecteur",
      "1 manchon Ø45mm - 2m", "1 lance queue de paon Ø40",
      "3 tuyaux échevaux Ø45mm - 20m + 1 LDV500",
      "2 Bidons émulseur 25l", "2 Bouteilles d'eau",
      "1 tuyau Ø70mm - 20m (coffre bas)", "1 Division Ø65 - 65/2x40",
    ],
    "Caisse": [
      "1 Valise électro-secours", "1 Brancard souple", "1 Bâche",
      "1 Lance à mousse Moyen Foisonnement", "1 Touret ligne guide", "1 Rallonge",
      "1 Crépine", "1 Flotteur", "2 Etrangleurs", "2 Obturateurs de fuite 70",
      "1 Clé de poteaux", "1 Coude d'alimentation", "1 Collecteur d'alim.",
      "1 Retenue", "1 Division Ø100/3x65", "1 Division Ø65/2x40", "1 Projecteur",
      "2 Polycoises", "1 Coude 90° Ø100 DSP/DSP", "1 Raccord réduction Ø100/65",
      "1 Raccord réduction Ø65/40", "1 Raccord réduction Ø40/20 GFR",
      "8 tuyaux Ø70mm - 20m", "1 tuyau Ø70mm - 20m", "1 tuyau Ø110mm - 10m",
    ],
    "Toit & Arrière": [
      "4 Aspiraux Ø100mm (coffre de toit)", "2 DFT (coffre de toit)",
      "1 Echelle à crochets", "1 Echelle à coulisse", "1 Gaffe",
      "2 Dévidoirs (dont un avec division mixte)", "1 LDT", "1 manivelle LDT", "2 Tricoises",
    ],
  },
  2: { // CCFS (inventaire CCGC)
    "Cabine & Documents": [
      "Kilométrage noté", "Niveau carburant GASOIL", "Niveau AD BLUE",
      "1 Extincteur 2kg poudre ABC", "2 GHV", "3 Demi-masques d'air respirable",
      "1 Projecteur", "2 Lampes 6V", "1 Atlas départemental",
      "3 Atlas 1 à 3", "Carte secteur", "1 Bouteille d'air comprimé",
      "1 Support radio ANTARES (BER)", "1 Crochet de remorquage",
      "1 Clé autoroute A65", "1 Lutin DFCI/DECI", "1 Petite pince",
      "1 Badge essence SDIS40", "Documents du véhicule",
      "1 Clé caméléon", "1 Boite d'ampoules + fusibles",
    ],
    "Équipement aspiration": [
      "8 Aspiraux 110mm", "2 Aspiraux 110mm (coffre)",
      "1 ARI", "1 Bouteille d'air",
    ],
    "Équipement incendie": [
      "1 Extincteur poudre 9kg", "1 Cale de roue", "5 Cônes de Lubeck",
      "2 Commandes", "2 Crépines 100mm", "2 Flotteurs", "2 Tri-flashs",
      "1 Canon DV 2500l/mn", "1 Cône polymousse",
    ],
    "Tuyaux": [
      "4 DFT", "1 Tuyau 100mm/20m", "1 Tuyau 110mm/10m",
      "3 Tuyaux 70mm/20m", "1 Tuyau 110mm/10m",
      "3 Tuyaux 45mm/20m", "1 LDV 500 + tuyau 2m",
    ],
    "Raccords & Accessoires": [
      "1 Division 100 - 3x65mm", "1 Clé de poteau", "1 Clé de barrage",
      "2 Tricoises 110mm", "2 Collecteurs d'alimentation 100mm",
      "2 Coudes d'alimentation 100mm",
    ],
    "Divers": [
      "1 Elingue", "1 Piscine 10m3", "1 Pompe à air", "2 Bâches de protection",
    ],
  },
  3: { // CCFM6 601 (inventaire CCFS1)
    "Cabine & Documents": [
      "Kilométrage noté", "Niveau carburant GASOIL", "Niveau AD BLUE",
      "2 GHV", "1 Trousse à outils", "1 Radio ANTARES",
      "1 Boite d'ampoules", "2 Triangles", "4 Demi-masques",
      "Pochette rouge documents véhicule", "1 Bouteille d'air",
      "1 Inventaire (portière droite)", "4 Masques FFP2",
    ],
    "Marche-pied gauche": [
      "1 Barre cric", "1 Système de gonflage", "1 Câble démarrage OTAN",
      "1 Cric", "1 Kit filtres + joints", "1 Clé capot",
      "1 Commande de treuil", "2 Poignées vannes démontées",
    ],
    "Après le réservoir": [
      "1 Extincteur 9kg poudre ABC", "2 Cales de roue",
    ],
    "Caisse": [
      "1 Elingue textile 8T", "2 Manilles", "1 Poulie", "1 Sangle textile plate 3T",
      "1 Division 40/2x40", "1 Raccord réduction DSP100/DSP65",
      "1 Raccord réduction DSP65/DSP40", "1 Raccord réduction DSP40/GFR22 mâle",
      "1 Lance 40/7", "2 Cales en bois (sous caisse)", "1 Démonte roue + rallonge",
    ],
    "Étagère droite": [
      "1 Pantalon de tronçonnage", "1 Casque à visière", "2 Hamacs",
      "1 Tronçonneuse", "1 Bidon de tronçonneuse", "1 Lime", "1 Clé à bougie",
    ],
    "Dévidoirs": [
      "1 Dévidoir LDT (4 tuyaux) - gauche", "1 Lance LDT",
      "1 Dévidoir 45 (3x20m) - droite",
    ],
    "Arrière": [
      "4 Tuyaux aspiraux 100", "1 Barre démonte pneu", "1 Pelle", "1 Pioche",
      "1 Barre de remorquage", "1 Lance canon 1000l/mn 7bar",
      "1 LDV 500", "1 Lance 40/10", "1 Lance 40/9",
    ],
    "Étagère du haut": [
      "3 Tuyaux souples Ø70mm/20m", "2 Tuyaux souples Ø45mm/20m",
      "4 Tuyaux souples 20m", "1 Flotteur", "1 Crépine", "1 Commande",
      "1 Cône polymousse", "2 Coises de 100", "2 Polycoises", "1 Clé fédérale",
    ],
  },
  4: { // CCFM6 604 (inventaire CCFS2)
    "Cabine & Documents": [
      "Kilométrage noté", "Niveau carburant GASOIL", "Niveau AD BLUE",
      "2 GHV", "1 Trousse à outils (derrière siège conducteur)",
      "1 Boite d'ampoules", "2 Triangles", "1 Bouteille d'air",
      "4 Demi-masques", "1 Radio ANTARES",
      "Pochette rouge documents véhicule",
      "1 Inventaire (portière droite)", "4 Masques FFP2",
      "2 Poignées vannes démontées (portière gauche)",
    ],
    "Marche-pied gauche": [
      "1 Barre cric", "1 Barre démonte roue", "1 Système de gonflage",
      "1 Câble démarrage OTAN", "1 Câble prise Maréchal",
      "1 Cric", "1 Kit filtres + joints", "1 Clé capot", "1 Commande de treuil",
    ],
    "Après le réservoir": [
      "1 Extincteur 9kg poudre ABC", "2 Cales de roue",
    ],
    "Caisse": [
      "1 Elingue textile 8T", "2 Manilles", "1 Poulie", "1 Cordage",
      "1 Sangle textile plate 3T", "1 Division 40/2x40",
      "1 Division 40/40/2x20", "1 Raccord réduction DSP100/DSP65",
      "1 Raccord réduction DSP65/DSP40", "1 Raccord réduction DSP40/GFR22 mâle",
      "1 Lance 40/7", "1 Lance 40/9 (sous étagère)",
      "2 Cales en bois", "1 Démonte roue + rallonge",
    ],
    "Étagère droite": [
      "1 Pantalon de tronçonnage", "1 Casque à visière", "2 Hamacs",
      "1 Tronçonneuse", "1 Bidon de tronçonneuse", "1 Lime", "1 Clé à bougie",
    ],
    "Dévidoirs": [
      "1 Dévidoir LDT (4 tuyaux) - gauche", "1 Lance LDT",
      "1 Dévidoir 45 (3x20m) - droite",
    ],
    "Arrière": [
      "4 Tuyaux aspiraux 100", "1 Barre démonte pneu", "1 Pelle", "1 Pioche",
      "1 Barre de remorquage", "1 Lance canon 1000l/mn 7bar",
      "1 LDV 500", "1 Lance 40/10", "1 Lance 40/9",
    ],
    "Étagère du haut": [
      "2 Tuyaux souples Ø70mm/20m", "1 Tuyau souple Ø70mm/10m",
      "2 Tuyaux souples Ø45mm/20m", "4 Tuyaux souples 20m",
      "1 Flotteur", "1 Crépine", "1 Commande",
      "1 Cône polymousse", "2 Coises de 100", "2 Polycoises", "1 Clé fédérale",
    ],
  },
  5: { // VLHR
    "Cabine avant": [
      "2 GHV", "Documents de bord", "1 Dossier accident de service",
      "1 Polycoise", "Stylos + Feutres", "1 Triangle de pré-signalisation",
      "1 Carte carburant", "1 Boite d'ampoules + fusibles",
      "1 Radio BIV", "1 Radio 80 MHz", "1 Projecteur à main",
      "1 Cric avec barre et clé démonte roue", "1 Porte radio (Holster)",
    ],
    "Cabine arrière": [
      "1 Lutin DECI/DFCI", "1 Trousse de secours", "1 Carte camp de Tir Captieux",
      "1 Kit de décontamination fumées", "1 Hamac", "Carto FDF",
      "1 Casque protection", "2 Guêtres", "1 Pantalon protection",
    ],
    "Gauche": [
      "1 Extincteur 9kg poudre ABC", "1 Coupe boulon",
      "1 Bidon d'essence 20l", "1 Bidon tronçonneuse 5l",
      "1 Bidon d'amorçage 5l", "2 Commandes",
    ],
    "Centre": [
      "1 MPF n°31", "1 MPE n°146", "1 Caisse à outils",
      "1 Tronçonneuse", "1 Division Ø65/2x65", "Câbles de pontage",
    ],
    "Droite": [
      "1 Division Ø65/2x65", "1 Crépine d'aspiration + flotteur",
      "1 Tuyau Ø110mm/10m", "1 Guêrpe (sapi)", "1 Hache",
      "1 Tuyaux Ø70mm/10m", "2 Tuyaux Ø70mm/20m",
    ],
    "Coffre arrière": [
      "1 Division Ø100/3x65", "1 Bidon d'amorçage 5l",
      "1 Bidon tronçonneuse 5l", "3 Tuyaux d'aspiration Ø110",
      "1 Raccord de réduction 100/65",
    ],
  },
  6: { // VSRM
    "Cabine & Documents": [
      "Kilométrage noté", "Niveau carburant", "Documents de bord",
      "Radio véhicule fonctionnelle",
    ],
    "Équipement secours routier": [
      "Désincarcérateur présent et fonctionnel", "Groupe hydraulique OK",
      "Lève-véhicule présent", "Outillage de désincarcération complet",
      "EPI présents (casques, gants)", "Extincteur présent",
    ],
    "Matériel médical": [
      "DSA présent et chargé", "Sac médical complet",
      "Oxygène (pression et quantité)", "Couvertures de survie",
    ],
  },
  7: { // MPRI (inventaire MPRI 008 Roquefort)
    "Arrière": [
      "3 tuyaux Ø70mm - 20m",
      "2 aspiraux semi-rigides Ø70mm",
      "1 Division Ø65 / 2x65",
      "2 coudes de remplissage",
      "1 bidon de gazole 25l",
      "1 Masse",
      "1 Carré de manœuvre",
      "1 Roue de secours",
      "1 Croix",
    ],
  },
  8: { // VSAV 1 (inventaire VSAV V1)
    "Cabine avant": [
      "Kilométrage noté", "Niveau carburant",
      "2 GHV", "Documents de bord", "1 Dossier accident de service",
      "1 Polycoise", "Stylos + Feutres", "1 Triangle de pré-signalisation",
      "1 Carte carburant", "1 Boite d'ampoules + fusibles",
      "1 Radio BIV", "1 Radio 80 MHz", "1 Projecteur à main",
      "1 Cric avec barre et clé démonte roue", "1 Porte radio (Holster)",
    ],
    "Cabine arrière": [
      "1 Lutin DECI/DFCI", "1 Trousse de secours",
      "1 Carte camp de Tir Captieux", "1 Kit de décontamination fumées",
      "1 Hamac", "Carto FDF", "1 Casque protection", "2 Guêtres",
      "1 Pantalon protection",
    ],
    "Gauche": [
      "1 Extincteur 9kg poudre ABC", "1 Coupe boulon",
      "1 Bidon d'essence 20l", "1 Bidon tronçonneuse 5l",
      "1 Bidon d'amorçage 5l", "2 Commandes",
    ],
    "Centre": [
      "1 MPF n°31", "1 MPE n°146", "1 Caisse à outils",
      "1 Tronçonneuse", "1 Division Ø65/2x65", "Câbles de pontage",
    ],
    "Droite": [
      "1 Division Ø65/2x65", "1 Crépine d'aspiration + flotteur",
      "1 Tuyau Ø110mm/10m", "1 Guêrpe (sapi)", "1 Hache",
      "1 Tuyaux Ø70mm/10m", "2 Tuyaux Ø70mm/20m",
    ],
    "Coffre arrière": [
      "1 Division Ø100/3x65", "1 Bidon d'amorçage 5l",
      "1 Bidon tronçonneuse 5l", "3 Tuyaux d'aspiration Ø110",
      "1 Raccord de réduction 100/65",
    ],
  },
  9: { // VSAV 2 (même inventaire que VSAV 1)
    "Cabine avant": [
      "Kilométrage noté", "Niveau carburant",
      "2 GHV", "Documents de bord", "1 Dossier accident de service",
      "1 Polycoise", "Stylos + Feutres", "1 Triangle de pré-signalisation",
      "1 Carte carburant", "1 Boite d'ampoules + fusibles",
      "1 Radio BIV", "1 Radio 80 MHz", "1 Projecteur à main",
      "1 Cric avec barre et clé démonte roue", "1 Porte radio (Holster)",
    ],
    "Cabine arrière": [
      "1 Lutin DECI/DFCI", "1 Trousse de secours",
      "1 Carte camp de Tir Captieux", "1 Kit de décontamination fumées",
      "1 Hamac", "Carto FDF", "1 Casque protection", "2 Guêtres",
      "1 Pantalon protection",
    ],
    "Gauche": [
      "1 Extincteur 9kg poudre ABC", "1 Coupe boulon",
      "1 Bidon d'essence 20l", "1 Bidon tronçonneuse 5l",
      "1 Bidon d'amorçage 5l", "2 Commandes",
    ],
    "Centre": [
      "1 MPF n°31", "1 MPE n°146", "1 Caisse à outils",
      "1 Tronçonneuse", "1 Division Ø65/2x65", "Câbles de pontage",
    ],
    "Droite": [
      "1 Division Ø65/2x65", "1 Crépine d'aspiration + flotteur",
      "1 Tuyau Ø110mm/10m", "1 Guêrpe (sapi)", "1 Hache",
      "1 Tuyaux Ø70mm/10m", "2 Tuyaux Ø70mm/20m",
    ],
    "Coffre arrière": [
      "1 Division Ø100/3x65", "1 Bidon d'amorçage 5l",
      "1 Bidon tronçonneuse 5l", "3 Tuyaux d'aspiration Ø110",
      "1 Raccord de réduction 100/65",
    ],
  },
  10: { // VTU-A
    "Cabine avant": [
      "1 Lutin DECI/DFCI", "4 Atlas FDF", "Plaquettes avec fiches bilans",
      "2 Boites de gants S/XL", "1 Boite d'ampoules", "1 Radio Antarès",
      "1 GPS", "2 Triangles de présignalisation",
      "1 Kit de décontamination", "1 Cric",
    ],
    "Avant Gauche": [
      "1 Pompe électrique", "1 Tuyau semi-rigide Ø45", "1 Prolongateur 220V/40m",
      "1 Caisse cales en bois", "2 Bidons carburant SP95",
      "1 Balai de cantonnier", "1 Pelle à neige", "2 Raclettes",
      "1 Triangle tri-flash", "1 Paire câble de pontage",
      "1 Clé en croix poids lourds", "1 MPE n°145 Ø100",
      "4 Piquets porte-tuyaux (avant droit)",
    ],
    "Arrière Gauche": [
      "1 Coude 100/100 DSP/DSP", "1 Rac Red 100/65", "1 Rac Red 65/40",
      "1 Crépine 100", "1 Crépine plate 45", "1 Flotteur",
      "8 Tuyaux Ø70mm/20m", "1 Cordage", "2 DFT", "1 Caisse à outils",
      "2 Commandes", "4 Tuyaux Ø45mm/20m",
      "1 Tuyau Ø110mm/10m", "1 MPE n°158 30m3/h",
      "3 GHV", "2 Projecteurs 220V", "2 Prolongateurs 220V/25m",
      "1 Groupe électrogène 230V n°87",
    ],
    "Arrière Droite": [
      "1 Caisse à outils", "2 Bidons d'eau", "2 Lampes portatives",
      "2 LDV 500", "3 Bottes 40/42/45", "3 Tenues de pluie 2XL/1L",
      "1 Division Ø65/2x40", "2 Divisions Ø100/3x65",
      "2 Divisions Ø65/2x65", "1 Roue de secours",
      "1 Extincteur poudre 9kg", "5 Cônes de Lubeck",
      "4 Bidons de mouillant BIO FOR C",
    ],
    "Arrière outillage": [
      "2 Longes", "1 Hache (gauche)", "1 Cerpe croissant", "1 Pelle",
      "1 Phare de travail", "2 Tricoises GM", "2 Polycoises PM",
      "1 Carré de manœuvre DFCI", "3 Aspiraux Ø100",
      "1 Clef de barrage", "1 Hache (droite)",
      "1 Echelle à coulisse (toit)", "1 Gaffe 4m (toit)",
    ],
  },
  11: { // MPR
    "Arrière": [
      "2 Polycoises", "2 Coises de 100", "5 Aspiraux Ø110mm",
      "1 Collecteur d'alim.", "1 Commande", "1 Cale de roue",
    ],
    "Avant": [
      "1 Tuyau Ø110mm - 10m", "1 Tuyau Ø70mm - 20m", "1 Tuyau Ø70mm - 10m",
      "1 Division 100 - 2x65", "1 Clé de poteau", "1 Raccord red 100/65",
      "1 Commande", "1 Crépine et un flotteur",
    ],
  },
  12: { // VLR (inventaire VLHR Saint Justin)
    "Cabine": [
      "Kilométrage noté", "Niveau carburant",
      "1 Projecteur", "1 Trousse de secours", "1 Cric + Triangle",
      "4 Atlas FDF", "1 Lutin", "1 Plaquette CUIFF",
      "1 Plan Champ de Tir Captieux", "1 Badge carburant",
      "2 GHV", "1 GPS", "1 Porte TPH700", "1 Boite d'ampoules",
    ],
    "Cabine arrière": [
      "2 Tuyaux d'aspiration Ø100/2m", "2 Tuyaux Ø22 - 20m",
      "1 Raccord réd./transf. 40/20 GFR", "1 Tuyau Ø45 - 20m",
      "3 Tuyaux Ø70 - 20m",
      "1 Extincteur poudre 9kg", "1 Jerrican essence",
      "Câbles de pontage", "1 MPE", "1 Flotteur + Crépine",
      "1 Clé en croix", "1 Division Ø65/2x65",
      "1 Raccord de réduction Ø100/65",
      "1 Tronçonneuse n°048", "1 Bidon de tronçonneuse",
      "1 Cale", "1 Hache", "1 Guerpre", "1 Casque de tronçonnage",
      "1 Bidon d'amorçage",
    ],
    "Caisse grise": [
      "1 Hamac", "2 Guêtres", "2 Manilles", "1 Casque protection bruit",
      "1 Kit décontamination fumées + sacs poubelle",
      "1 Pantalon de tronçonnage", "1 Commande", "1 Elingue 3t",
      "2 Polycoises", "2 Clefs à bougie", "1 Lime", "1 Bec verseur",
      "1 Carré de manœuvre",
      "1 Paire de gants", "3 GHV", "1 Kit Premiers secours",
      "1 Lot de masques FFP2", "2 Rubalises",
    ],
  },
};

const USERS = [
  // Admins
  { id: 1,  nom: "Larrouy Olivier",       role: "admin", groupe: "SPP" },
  { id: 2,  nom: "Plantey Ascelin",        role: "admin", groupe: "SPP" },
  { id: 3,  nom: "Walraeve Jean-David",    role: "admin", groupe: "SPP" },
  // SPP
  { id: 4,  nom: "Davanzo Jean Michel",    role: "user",  groupe: "SPP" },
  { id: 5,  nom: "Chaussis Sylvain",       role: "admin", groupe: "SPP" },
  { id: 6,  nom: "Irenee Guillaume",       role: "user",  groupe: "SPP" },
  { id: 7,  nom: "Lopez Christian",        role: "user",  groupe: "SPP" },
  { id: 8,  nom: "Baroffio Pascal",        role: "user",  groupe: "SPP" },
  { id: 9,  nom: "Techoueyres Kevin",      role: "user",  groupe: "SPP" },
  { id: 10, nom: "Lefeuvre Konogan",       role: "user",  groupe: "SPP" },
  { id: 11, nom: "Duhourquet Benjamin",    role: "user",  groupe: "SPP" },
  { id: 12, nom: "Lataste Fabien",         role: "user",  groupe: "SPP" },
  { id: 13, nom: "Aufort Simon",           role: "user",  groupe: "SPP" },
  { id: 14, nom: "Simon Jade",             role: "user",  groupe: "SPP" },
  { id: 15, nom: "Feret Mathieu",          role: "user",  groupe: "SPP" },
  { id: 16, nom: "Micallef Florian",       role: "user",  groupe: "SPP" },
  { id: 17, nom: "Dayres Anthony",         role: "user",  groupe: "SPP" },
  { id: 18, nom: "Dubourg Antoine",        role: "user",  groupe: "SPP" },
  // SPV
  { id: 19, nom: "Bethencourt Tanguy",     role: "user",  groupe: "SPV" },
  { id: 20, nom: "Bloss David",            role: "user",  groupe: "SPV" },
  { id: 21, nom: "Gelot Yoni",             role: "user",  groupe: "SPV" },
  { id: 22, nom: "Kaprov Igor",            role: "user",  groupe: "SPV" },
  { id: 23, nom: "Raballand Nicolas",      role: "user",  groupe: "SPV" },
  { id: 24, nom: "Etheve Romain",          role: "user",  groupe: "SPV" },
  { id: 25, nom: "Patou Maxime",           role: "user",  groupe: "SPV" },
  { id: 26, nom: "Filipe Loic",            role: "user",  groupe: "SPV" },
  { id: 27, nom: "Saugrain Célia",         role: "user",  groupe: "SPV" },
  { id: 28, nom: "Cordani Frank",          role: "user",  groupe: "SPV" },
  { id: 29, nom: "Da Silva Jeremy",        role: "user",  groupe: "SPV" },
  { id: 30, nom: "Delbarre Anthony",       role: "user",  groupe: "SPV" },
  { id: 31, nom: "Fradet Nicolas",         role: "user",  groupe: "SPV" },
  { id: 32, nom: "Kaprov Maxime",          role: "user",  groupe: "SPV" },
  { id: 33, nom: "Paillet Patrick",        role: "user",  groupe: "SPV" },
  { id: 34, nom: "Ado Aurélien",           role: "user",  groupe: "SPV" },
  { id: 35, nom: "Mano Vincent",           role: "user",  groupe: "SPV" },
  { id: 36, nom: "Lavier Fred",            role: "user",  groupe: "SPV" },
  { id: 37, nom: "Le Gall Christophe",     role: "user",  groupe: "SPV" },
  { id: 38, nom: "Perret Quentin",         role: "user",  groupe: "SPV" },
  { id: 39, nom: "Petit Frédéric",         role: "user",  groupe: "SPV" },
  { id: 40, nom: "Perinelle Fabienne",     role: "user",  groupe: "SPV" },
  { id: 41, nom: "Kaprov Alice",           role: "user",  groupe: "SPV" },
  { id: 42, nom: "Schimdt Cassiopée",      role: "user",  groupe: "SPV" },
  { id: 43, nom: "Danthez Virginie",       role: "user",  groupe: "SPV" },
  // Saisonniers
  { id: 44, nom: "Elissondo Andoni",       role: "user",  groupe: "Saisonnier" },
  { id: 45, nom: "Vaudrion Marie",         role: "user",  groupe: "Saisonnier" },
  { id: 46, nom: "Lafont Gabriel",         role: "user",  groupe: "Saisonnier" },
  { id: 47, nom: "Dorde Axel",             role: "user",  groupe: "Saisonnier" },
  { id: 48, nom: "Petit Frédéric S.",      role: "user",  groupe: "Saisonnier" },
  { id: 49, nom: "Terral Illona",          role: "user",  groupe: "Saisonnier" },
];


const getInitiales = (nom) => {
  const parts = nom.trim().split(" ");
  return (parts[0][0] + (parts[1] ? parts[1][0] : "")).toUpperCase();
};
const STATUS_COLORS = {
  ok: "#10b981",
  anomalie: "#f59e0b",
  nonVerifie: "#6b7280",
  critique: "#ef4444",
};

function Badge({ status }) {
  const config = {
    ok: { label: "✓ Vérifié", bg: "#d1fae5", color: "#065f46" },
    anomalie: { label: "⚠ Anomalie", bg: "#fef3c7", color: "#92400e" },
    nonVerifie: { label: "— En attente", bg: "#f3f4f6", color: "#374151" },
    critique: { label: "✕ Critique", bg: "#fee2e2", color: "#991b1b" },
  }[status] || { label: status, bg: "#f3f4f6", color: "#374151" };

  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700,
      background: config.bg, color: config.color, letterSpacing: "0.03em",
    }}>
      {config.label}
    </span>
  );
}

function Avatar({ initiales, size = 32 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: "linear-gradient(135deg, #dc2626, #991b1b)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontWeight: 800, fontSize: size * 0.35,
      flexShrink: 0, fontFamily: "'Barlow Condensed', sans-serif",
      letterSpacing: "0.05em",
    }}>
      {initiales}
    </div>
  );
}

function LoginScreen({ onSelect }) {
  const [search, setSearch] = useState("");
  const [freeNom, setFreeNom] = useState("");
  const [showFree, setShowFree] = useState(false);
  const filtered = USERS.filter(u => u.nom.toLowerCase().includes(search.toLowerCase()));
  const grouped = ["SPP", "SPV", "Saisonnier"].map(g => ({
    label: g, users: filtered.filter(u => u.groupe === g)
  }));
  const inputStyle = { width: "100%", background: "#1a1a1a", border: "1px solid #333", color: "#f5f5f5", borderRadius: 10, padding: "10px 14px", fontSize: 14, fontFamily: "'Barlow', sans-serif", boxSizing: "border-box" };
  const S2 = {
    app: { fontFamily: "'Barlow', sans-serif", maxWidth: 430, margin: "0 auto", minHeight: "100vh", background: "#0f0f0f", color: "#f5f5f5", display: "flex", flexDirection: "column" },
    header: { background: "linear-gradient(135deg, #1a0000 0%, #2d0505 100%)", borderBottom: "2px solid #dc2626", padding: "16px 20px 12px" },
    headerTitle: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "0.06em", textTransform: "uppercase" },
    card: { background: "#1a1a1a", borderRadius: 12, padding: "12px 14px", border: "1px solid #2a2a2a", marginBottom: 8 },
    sectionTitle: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12, fontWeight: 700, color: "#6b7280", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8, marginTop: 4 },
  };
  const handleFreeEntry = () => {
    const nom = freeNom.trim();
    if (!nom) return;
    onSelect({ id: Date.now(), nom, role: "user", groupe: "Autre" });
  };
  return (
    <div style={S2.app}>
      <div style={S2.header}>
        <div style={S2.headerTitle}>🚒 Remise de Labouheyre</div>
        <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>CS Labouheyre — Identification</div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
        {/* Saisie libre */}
        <div style={{ ...S2.card, marginBottom: 20, borderLeft: "3px solid #4b5563" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: showFree ? 12 : 0 }}>
            <span style={{ fontSize: 13, color: "#9ca3af" }}>Nom non listé ?</span>
            <button onClick={() => setShowFree(v => !v)} style={{ background: "none", border: "1px solid #333", color: "#f5f5f5", borderRadius: 8, padding: "4px 12px", fontSize: 12, cursor: "pointer", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}>
              {showFree ? "Annuler" : "Saisir un nom ›"}
            </button>
          </div>
          {showFree && (
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={freeNom} onChange={e => setFreeNom(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleFreeEntry()}
                placeholder="Prénom Nom..."
                autoFocus
                style={{ ...inputStyle, flex: 1, marginBottom: 0 }}
              />
              <button onClick={handleFreeEntry} style={{ background: "#dc2626", border: "none", color: "#fff", borderRadius: 8, padding: "0 16px", cursor: "pointer", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 14 }}>
                OK
              </button>
            </div>
          )}
        </div>

        <div style={{ marginBottom: 14, fontSize: 13, color: "#9ca3af" }}>Ou sélectionnez votre nom :</div>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Rechercher..."
          style={{ ...inputStyle, marginBottom: 16 }}
        />
        {grouped.map(({ label, users }) => users.length === 0 ? null : (
          <div key={label} style={{ marginBottom: 16 }}>
            <div style={S2.sectionTitle}>{label} <span style={{ color: "#dc2626" }}>({users.length})</span></div>
            {users.map(u => (
              <div key={u.id} onClick={() => onSelect(u)} style={{ ...S2.card, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", borderLeft: u.role === "admin" ? "3px solid #dc2626" : "3px solid #2a2a2a" }}>
                <Avatar initiales={getInitiales(u.nom)} size={38} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{u.nom}</div>
                  {u.role === "admin" && <div style={{ fontSize: 11, color: "#dc2626" }}>🔑 Administrateur</div>}
                </div>
                <span style={{ color: "#555", fontSize: 20 }}>›</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home"); // home | verif | admin | historique
  const [selectedEngin, setSelectedEngin] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [checklist, setChecklist] = useState(() => {
    const init = {};
    ENGINS.forEach(e => {
      init[e.id] = {};
      const cl = CHECKLIST_BASE[e.id] || {};
      Object.entries(cl).forEach(([cat, items]) => {
        items.forEach(item => { init[e.id][item] = null; });
      });
    });
    return init;
  });
  const [verifications, setVerifications] = useState([
    { id: 1, enginId: 3, user: USERS[3], date: "2026-05-31 07:42", status: "ok", anomalies: [] },
    { id: 2, enginId: 5, user: USERS[4], date: "2026-05-31 07:55", status: "anomalie", anomalies: ["Niveau émulseur bas"] },
    { id: 3, enginId: 1, user: USERS[0], date: "2026-05-31 08:10", status: "ok", anomalies: [] },
  ]);
  const [notes, setNotes] = useState({});
  const [verifDateTime, setVerifDateTime] = useState(() => new Date().toISOString().slice(0,16));
  const [adminTab, setAdminTab] = useState("checklist");
  const [adminEngin, setAdminEngin] = useState(1);
  const [newItem, setNewItem] = useState("");
  const [newCat, setNewCat] = useState("");
  const [newItemCat, setNewItemCat] = useState("Cabine & Extérieur");
  const [customChecklist, setCustomChecklist] = useState(CHECKLIST_BASE);
  const [alerteVisible, setAlerteVisible] = useState(true);
  const [editingItem, setEditingItem] = useState(null); // { cat, idx, value }

  const isVerifValide = (engin, verif) => {
  if (!verif) return false;
  const now = new Date();
  const verifDate = new Date(verif.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'));
  if (isNaN(verifDate)) {
    // fallback: try direct parse
    const parts = verif.date.split(/[\s/:]/);
    return false;
  }
  if (engin.freq === "hebdo") {
    return (now - verifDate) < 7 * 24 * 60 * 60 * 1000;
  }
  return verifDate.toDateString() === now.toDateString();
};

const getEnginStatus = (enginId) => {
    const engin = ENGINS.find(e => e.id === enginId);
    const v = verifications.filter(v => v.enginId === enginId);
    if (!v.length) return "nonVerifie";
    const last = v[v.length - 1];
    if (!isVerifValide(engin, last)) return "nonVerifie";
    return last.status;
  };

  const getVerifCount = () => verifications.filter(v => {
    const today = new Date().toISOString().slice(0, 10);
    return v.date.startsWith(today);
  }).length;

  const getAnomalies = () => verifications.filter(v => v.status === "anomalie" || v.status === "critique");

  const handleCheck = (item, val) => {
    setChecklist(prev => ({
      ...prev,
      [selectedEngin.id]: { ...prev[selectedEngin.id], [item]: val },
    }));
  };

  const submitVerif = () => {
    const items = checklist[selectedEngin.id];
    const anomalies = Object.entries(items).filter(([, v]) => v === false).map(([k]) => k);
    const allChecked = Object.values(items).every(v => v !== null);
    if (!allChecked) return alert("Veuillez vérifier tous les éléments.");
    const status = anomalies.length > 2 ? "critique" : anomalies.length > 0 ? "anomalie" : "ok";
    setVerifications(prev => [...prev, {
      id: Date.now(), enginId: selectedEngin.id,
      user: currentUser, date: verifDateTime ? new Date(verifDateTime).toLocaleString("fr-FR").replace(",","") : new Date().toLocaleString("fr-FR").replace(",",""),
      status, anomalies,
    }]);
    setScreen("home");
  };

  const addCheckItem = () => {
    if (!newItem.trim()) return;
    const cat = newItemCat === "__new__" ? newCat.trim() : newItemCat;
    if (!cat) return;
    setCustomChecklist(prev => ({
      ...prev,
      [adminEngin]: {
        ...(prev[adminEngin] || {}),
        [cat]: [...((prev[adminEngin] || {})[cat] || []), newItem.trim()],
      },
    }));
    setNewItem("");
    if (newItemCat === "__new__") { setNewItemCat(cat); setNewCat(""); }
  };

  const statusCounts = {
    ok: ENGINS.filter(e => getEnginStatus(e.id) === "ok").length,
    anomalie: ENGINS.filter(e => getEnginStatus(e.id) === "anomalie").length,
    critique: ENGINS.filter(e => getEnginStatus(e.id) === "critique").length,
    nonVerifie: ENGINS.filter(e => getEnginStatus(e.id) === "nonVerifie").length,
  };

  const S = {
    app: {
      fontFamily: "'Barlow', sans-serif",
      maxWidth: 430, margin: "0 auto", minHeight: "100vh",
      background: "#0f0f0f", color: "#f5f5f5",
      display: "flex", flexDirection: "column",
    },
    header: {
      background: "linear-gradient(135deg, #1a0000 0%, #2d0505 100%)",
      borderBottom: "2px solid #dc2626",
      padding: "16px 20px 12px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    },
    headerTitle: {
      fontFamily: "'Barlow Condensed', sans-serif",
      fontSize: 20, fontWeight: 800, color: "#fff",
      letterSpacing: "0.06em", textTransform: "uppercase",
    },
    nav: {
      display: "flex", background: "#141414",
      borderTop: "1px solid #222", marginTop: "auto",
      position: "sticky", bottom: 0,
    },
    navBtn: (active) => ({
      flex: 1, padding: "12px 4px 10px", border: "none", background: "transparent",
      color: active ? "#dc2626" : "#6b7280", cursor: "pointer",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
      fontSize: 10, fontWeight: 700, letterSpacing: "0.05em",
      textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif",
      borderTop: active ? "2px solid #dc2626" : "2px solid transparent",
      transition: "all 0.15s",
    }),
    card: {
      background: "#1a1a1a", borderRadius: 12, padding: "14px 16px",
      border: "1px solid #2a2a2a", marginBottom: 10,
    },
    btn: (variant = "primary") => ({
      padding: "12px 20px", borderRadius: 8, border: "none", cursor: "pointer",
      fontFamily: "'Barlow Condensed', sans-serif",
      fontWeight: 700, fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase",
      background: variant === "primary" ? "#dc2626" : variant === "ghost" ? "transparent" : "#222",
      color: variant === "ghost" ? "#9ca3af" : "#fff",
      border: variant === "ghost" ? "1px solid #333" : "none",
      transition: "all 0.15s",
    }),
    sectionTitle: {
      fontFamily: "'Barlow Condensed', sans-serif",
      fontSize: 12, fontWeight: 700, color: "#6b7280",
      letterSpacing: "0.12em", textTransform: "uppercase",
      marginBottom: 10, marginTop: 4,
    },
  };

  // ── ÉCRAN CONNEXION ──────────────────────────────────────────────
  if (!currentUser) {
    return <LoginScreen onSelect={setCurrentUser} />;
  }

  // ── ÉCRAN VÉRIFICATION ────────────────────────────────────────────
  if (screen === "verif" && selectedEngin) {
    const items = checklist[selectedEngin.id];
    const checked = Object.values(items).filter(v => v !== null).length;
    const total = Object.values(items).length;
    const pct = Math.round((checked / total) * 100);

    return (
      <div style={S.app}>
        <div style={S.header}>
          <button onClick={() => setScreen("home")} style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", fontSize: 22 }}>‹</button>
          <div style={{ textAlign: "center" }}>
            <div style={{ ...S.headerTitle, fontSize: 16 }}>{selectedEngin.nom}</div>
            <div style={{ fontSize: 11, color: "#9ca3af", display:"flex", alignItems:"center", gap:6, justifyContent:"center" }}>
              {selectedEngin.freq === "hebdo"
                ? <span style={{color:"#a78bfa", fontWeight:700}}>📅 Hebdomadaire</span>
                : <span style={{color:"#60a5fa", fontWeight:700}}>📅 Quotidienne</span>}
            </div>
          </div>
          <Avatar initiales={getInitiales(currentUser.nom)} size={34} />
        </div>

        {/* Barre de progression */}
        <div style={{ padding: "14px 20px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: "#9ca3af" }}>Progression</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: pct === 100 ? "#10b981" : "#f59e0b" }}>{pct}%</span>
          </div>
          <div style={{ background: "#2a2a2a", borderRadius: 4, height: 6 }}>
            <div style={{ width: `${pct}%`, height: "100%", borderRadius: 4, background: pct === 100 ? "#10b981" : "#dc2626", transition: "width 0.3s" }} />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
          {Object.entries(customChecklist[selectedEngin.id] || {}).map(([cat, catItems]) => (
            <div key={cat} style={{ marginBottom: 20 }}>
              <div style={S.sectionTitle}>{cat}</div>
              {catItems.map(item => (
                <div key={item} style={{ ...S.card, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ flex: 1, fontSize: 13, color: items[item] === null ? "#e5e7eb" : items[item] ? "#10b981" : "#ef4444" }}>
                    {item}
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => handleCheck(item, true)} style={{
                      width: 34, height: 34, borderRadius: 8, border: "none", cursor: "pointer",
                      background: items[item] === true ? "#10b981" : "#2a2a2a",
                      color: items[item] === true ? "#fff" : "#6b7280", fontSize: 16,
                    }}>✓</button>
                    <button onClick={() => handleCheck(item, false)} style={{
                      width: 34, height: 34, borderRadius: 8, border: "none", cursor: "pointer",
                      background: items[item] === false ? "#ef4444" : "#2a2a2a",
                      color: items[item] === false ? "#fff" : "#6b7280", fontSize: 16,
                    }}>✕</button>
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div style={{ marginBottom: 16 }}>
            <div style={S.sectionTitle}>Date et heure de vérification</div>
            <input
              type="datetime-local"
              value={verifDateTime}
              onChange={e => setVerifDateTime(e.target.value)}
              style={{ width:"100%", background:"#1a1a1a", border:"1px solid #333", color:"#f5f5f5", borderRadius:10, padding:"10px 14px", fontSize:14, fontFamily:"'Barlow', sans-serif", boxSizing:"border-box", marginBottom:0 }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={S.sectionTitle}>Notes / Observations</div>
            <textarea
              value={notes[selectedEngin.id] || ""}
              onChange={e => setNotes(p => ({ ...p, [selectedEngin.id]: e.target.value }))}
              placeholder="Ajouter une note ou observation..."
              style={{
                width: "100%", background: "#1a1a1a", border: "1px solid #333",
                borderRadius: 10, color: "#f5f5f5", padding: 12, fontSize: 13,
                resize: "none", height: 80, fontFamily: "'Barlow', sans-serif",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button onClick={submitVerif} style={{ ...S.btn("primary"), width: "100%", padding: 14, fontSize: 15, marginBottom: 20 }}>
            Valider la vérification
          </button>
        </div>
      </div>
    );
  }

  // ── ÉCRAN ADMIN ───────────────────────────────────────────────────
  if (screen === "admin") {
    return (
      <div style={S.app}>
        <div style={S.header}>
          <div>
            <div style={S.headerTitle}>Administration</div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>Gestion du système</div>
          </div>
          <Avatar initiales={getInitiales(currentUser.nom)} size={34} />
        </div>

        <div style={{ display: "flex", borderBottom: "1px solid #222", background: "#141414" }}>
          {["checklist", "utilisateurs", "alertes"].map(tab => (
            <button key={tab} onClick={() => setAdminTab(tab)} style={{
              flex: 1, padding: "12px 4px", border: "none", background: "transparent",
              color: adminTab === tab ? "#dc2626" : "#6b7280", cursor: "pointer",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
              fontFamily: "'Barlow Condensed', sans-serif",
              borderBottom: adminTab === tab ? "2px solid #dc2626" : "2px solid transparent",
            }}>{tab}</button>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
          {adminTab === "checklist" && (
            <>
              <div style={S.sectionTitle}>Sélectionner un engin</div>
              <select value={adminEngin} onChange={e => { setAdminEngin(Number(e.target.value)); setNewItemCat(Object.keys(customChecklist[Number(e.target.value)]||{})[0]||""); }} style={{ width:"100%", background:"#222", border:"1px solid #333", color:"#f5f5f5", borderRadius:8, padding:"10px 12px", fontSize:13, fontFamily:"'Barlow', sans-serif", marginBottom:14 }}>
                {ENGINS.map(e => <option key={e.id} value={e.id}>{e.nom}</option>)}
              </select>
              <div style={S.sectionTitle}>Ajouter un élément</div>
              <div style={{ ...S.card, display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                <select value={newItemCat} onChange={e => setNewItemCat(e.target.value)} style={{ background: "#222", border: "1px solid #333", color: "#f5f5f5", borderRadius: 8, padding: "10px 12px", fontSize: 13, fontFamily: "'Barlow', sans-serif" }}>
                  {Object.keys(customChecklist[adminEngin] || {}).map(cat => <option key={cat}>{cat}</option>)}
                  <option value="__new__">+ Nouvelle catégorie...</option>
                </select>
                {newItemCat === "__new__" && (
                  <input
                    value={newCat} onChange={e => setNewCat(e.target.value)}
                    placeholder="Nom de la nouvelle catégorie..."
                    style={{ background: "#222", border: "1px solid #f59e0b", color: "#f5f5f5", borderRadius: 8, padding: "10px 12px", fontSize: 13, fontFamily: "'Barlow', sans-serif" }}
                  />
                )}
                <input
                  value={newItem} onChange={e => setNewItem(e.target.value)}
                  placeholder="Nom de l'élément à vérifier..."
                  style={{ background: "#222", border: "1px solid #333", color: "#f5f5f5", borderRadius: 8, padding: "10px 12px", fontSize: 13, fontFamily: "'Barlow', sans-serif" }}
                />
                <button onClick={addCheckItem} style={S.btn("primary")}>+ Ajouter</button>
              </div>

              {Object.entries(customChecklist[adminEngin] || {}).map(([cat, items]) => (
                <div key={cat} style={{ marginBottom: 16 }}>
                  <div style={S.sectionTitle}>{cat} <span style={{ color: "#dc2626" }}>({items.length})</span></div>
                  {items.map((item, i) => {
                    const isEditing = editingItem && editingItem.cat === cat && editingItem.idx === i;
                    return (
                      <div key={i} style={{ ...S.card, padding: "8px 10px", display: "flex", alignItems: "center", gap: 8 }}>
                        {isEditing ? (
                          <>
                            <input
                              autoFocus
                              value={editingItem.value}
                              onChange={e => setEditingItem(prev => ({ ...prev, value: e.target.value }))}
                              onKeyDown={e => {
                                if (e.key === "Enter") {
                                  const v = editingItem.value.trim();
                                  if (v) setCustomChecklist(prev => ({ ...prev, [adminEngin]: { ...(prev[adminEngin]||{}), [cat]: (prev[adminEngin]||{})[cat].map((it,idx) => idx===i ? v : it) } }));
                                  setEditingItem(null);
                                }
                                if (e.key === "Escape") setEditingItem(null);
                              }}
                              style={{ flex:1, background:"#222", border:"1px solid #dc2626", color:"#f5f5f5", borderRadius:6, padding:"6px 10px", fontSize:13, fontFamily:"'Barlow', sans-serif" }}
                            />
                            <button onClick={() => {
                              const v = editingItem.value.trim();
                              if (v) setCustomChecklist(prev => ({ ...prev, [adminEngin]: { ...(prev[adminEngin]||{}), [cat]: (prev[adminEngin]||{})[cat].map((it,idx) => idx===i ? v : it) } }));
                              setEditingItem(null);
                            }} style={{ background:"#10b981", border:"none", color:"#fff", borderRadius:6, padding:"4px 10px", cursor:"pointer", fontSize:13, fontWeight:700 }}>✓</button>
                            <button onClick={() => setEditingItem(null)} style={{ background:"none", border:"none", color:"#6b7280", cursor:"pointer", fontSize:16 }}>✕</button>
                          </>
                        ) : (
                          <>
                            <span style={{ flex:1, fontSize:13 }}>{item}</span>
                            <button onClick={() => setEditingItem({ cat, idx: i, value: item })} style={{ background:"none", border:"none", color:"#60a5fa", cursor:"pointer", fontSize:13, padding:"2px 6px" }}>✎</button>
                            <button onClick={() => setCustomChecklist(prev => ({ ...prev, [adminEngin]: { ...(prev[adminEngin]||{}), [cat]: (prev[adminEngin]||{})[cat].filter((_,idx)=>idx!==i) } }))} style={{ background:"none", border:"none", color:"#6b7280", cursor:"pointer", fontSize:16 }}>✕</button>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </>
          )}

          {adminTab === "utilisateurs" && (
            <>
              <div style={S.sectionTitle}>Équipe ({USERS.length})</div>
              {USERS.map(u => (
                <div key={u.id} style={{ ...S.card, display: "flex", alignItems: "center", gap: 12 }}>
                  <Avatar initiales={getInitiales(u.nom)} size={40} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{u.nom}</div>
                    <div style={{ fontSize: 12, color: "#9ca3af" }}>
                      {u.role === "admin" ? "🔑 Administrateur" : "👤 Utilisateur"}
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>
                    {verifications.filter(v => v.user.id === u.id).length} vérif.
                  </div>
                </div>
              ))}
              <button style={{ ...S.btn("ghost"), width: "100%", marginTop: 8 }}>+ Inviter un utilisateur</button>
            </>
          )}

          {adminTab === "alertes" && (
            <>
              <div style={S.sectionTitle}>Anomalies actives</div>
              {getAnomalies().length === 0 ? (
                <div style={{ ...S.card, textAlign: "center", color: "#6b7280", padding: 30 }}>
                  <div style={{ fontSize: 32 }}>✅</div>
                  <div style={{ marginTop: 8 }}>Aucune anomalie en cours</div>
                </div>
              ) : getAnomalies().map(v => {
                const engin = ENGINS.find(e => e.id === v.enginId);
                return (
                  <div key={v.id} style={{ ...S.card, borderLeft: "3px solid #f59e0b" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontWeight: 700 }}>{engin?.nom}</span>
                      <Badge status={v.status} />
                    </div>
                    <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 6 }}>Signalé par {v.user.nom} · {v.date}</div>
                    {v.anomalies.map((a, i) => (
                      <div key={i} style={{ fontSize: 12, color: "#f59e0b", display: "flex", alignItems: "center", gap: 6 }}>
                        <span>⚠</span> {a}
                      </div>
                    ))}
                  </div>
                );
              })}

              <div style={{ ...S.sectionTitle, marginTop: 20 }}>Paramètres alertes</div>
              {["Notification push si anomalie", "Alerte si non vérifié à 9h00", "Email quotidien récapitulatif"].map((pref, i) => (
                <div key={i} style={{ ...S.card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13 }}>{pref}</span>
                  <div style={{
                    width: 44, height: 24, borderRadius: 12,
                    background: i < 2 ? "#dc2626" : "#333",
                    position: "relative", cursor: "pointer",
                  }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: "50%", background: "#fff",
                      position: "absolute", top: 3,
                      left: i < 2 ? 23 : 3, transition: "left 0.2s",
                    }} />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <nav style={S.nav}>
          {[["🏠", "Accueil", "home"], ["📋", "Vérif.", "verif_select"], ["📊", "Historique", "historique"], ["⚙️", "Admin", "admin"]].map(([icon, label, s]) => (
            <button key={s} onClick={() => { if (s === "verif_select") { setSelectedEngin(null); setScreen("home"); } else setScreen(s); }} style={S.navBtn(screen === s)}>
              <span style={{ fontSize: 20 }}>{icon}</span>{label}
            </button>
          ))}
        </nav>
      </div>
    );
  }

  // ── ÉCRAN HISTORIQUE ──────────────────────────────────────────────
  if (screen === "historique") {
    return (
      <div style={S.app}>
        <div style={S.header}>
          <div>
            <div style={S.headerTitle}>Historique</div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>{verifications.length} vérifications enregistrées</div>
          </div>
          <Avatar initiales={getInitiales(currentUser.nom)} size={34} />
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
          {[...verifications].reverse().map(v => {
            const engin = ENGINS.find(e => e.id === v.enginId);
            return (
              <div key={v.id} style={{ ...S.card, borderLeft: `3px solid ${STATUS_COLORS[v.status] || "#333"}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{engin?.nom}</div>
                    <div style={{ fontSize: 11, color: "#9ca3af" }}>{engin?.type}</div>
                  </div>
                  <Badge status={v.status} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                  <Avatar initiales={getInitiales(v.user.nom)} size={24} />
                  <span style={{ fontSize: 12, color: "#9ca3af" }}>{v.user.nom}</span>
                  <span style={{ fontSize: 11, color: "#555", marginLeft: "auto" }}>{v.date}</span>
                </div>
                {v.anomalies.length > 0 && (
                  <div style={{ marginTop: 8, padding: "8px 10px", background: "#2a1a00", borderRadius: 6 }}>
                    {v.anomalies.map((a, i) => (
                      <div key={i} style={{ fontSize: 12, color: "#f59e0b" }}>⚠ {a}</div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <nav style={S.nav}>
          {[["🏠", "Accueil", "home"], ["📋", "Vérif.", "home"], ["📊", "Historique", "historique"], ["⚙️", "Admin", "admin"]].map(([icon, label, s]) => (
            <button key={s} onClick={() => setScreen(s)} style={S.navBtn(screen === s)}>
              <span style={{ fontSize: 20 }}>{icon}</span>{label}
            </button>
          ))}
        </nav>
      </div>
    );
  }

  // ── ÉCRAN ACCUEIL ─────────────────────────────────────────────────
  return (
    <div style={S.app}>
      {/* Header */}
      <div style={S.header}>
        <div>
          <div style={S.headerTitle}>🚒 Remise de Labouheyre</div>
          <div style={{ fontSize: 11, color: "#9ca3af" }}>
            {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
          </div>
        </div>
        <Avatar initiales={getInitiales(currentUser.nom)} size={36} />
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>

        {/* Alerte anomalie */}
        {alerteVisible && getAnomalies().length > 0 && (
          <div style={{
            background: "#2d1800", border: "1px solid #f59e0b", borderRadius: 12,
            padding: "12px 14px", marginBottom: 16, display: "flex", gap: 10, alignItems: "flex-start",
          }}>
            <span style={{ fontSize: 20 }}>⚠️</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#f59e0b" }}>
                {getAnomalies().length} anomalie(s) signalée(s)
              </div>
              <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>
                {getAnomalies().map(v => ENGINS.find(e => e.id === v.enginId)?.nom).join(", ")}
              </div>
            </div>
            <button onClick={() => setAlerteVisible(false)} style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer" }}>✕</button>
          </div>
        )}

        {/* Stats du jour */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          {[
            { label: "Vérifiés", val: statusCounts.ok, color: "#10b981", icon: "✓" },
            { label: "Anomalies", val: statusCounts.anomalie + statusCounts.critique, color: "#f59e0b", icon: "⚠" },
            { label: "En attente", val: statusCounts.nonVerifie, color: "#6b7280", icon: "—" },
            { label: "Total", val: ENGINS.length, color: "#dc2626", icon: "🚒" },
          ].map(s => (
            <div key={s.label} style={{ ...S.card, textAlign: "center", padding: "14px 10px" }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: s.color, fontFamily: "'Barlow Condensed', sans-serif" }}>
                {s.val}
              </div>
              <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Liste des engins */}
        <div style={S.sectionTitle}>Engins ({ENGINS.length})</div>
        {ENGINS.map(engin => {
          const status = getEnginStatus(engin.id);
          const lastVerif = [...verifications].reverse().find(v => v.enginId === engin.id);
          return (
            <div key={engin.id} style={{
              ...S.card,
              display: "flex", alignItems: "center", gap: 12, cursor: "pointer",
              borderLeft: `3px solid ${STATUS_COLORS[status] || "#333"}`,
            }}
              onClick={() => { setSelectedEngin(engin); setScreen("verif"); }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: "#222", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, flexShrink: 0,
              }}>🚒</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{engin.nom}</div>
                <div style={{ fontSize: 11, color: "#6b7280", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display:"flex", alignItems:"center", gap:4 }}>
                  {engin.type}
                  {engin.freq === "hebdo" && <span style={{color:"#a78bfa", fontSize:10, fontWeight:700, flexShrink:0}}>· HEBDO</span>}
                </div>
                {lastVerif && (
                  <div style={{ fontSize: 10, color: "#555", marginTop: 1 }}>
                    {lastVerif.user.nom} · {lastVerif.date}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                <Badge status={status} />
                <span style={{ fontSize: 18, color: "#333" }}>›</span>
              </div>
            </div>
          );
        })}
      </div>

      <nav style={S.nav}>
        {[["🏠", "Accueil", "home"], ["📋", "Vérif.", "home"], ["📊", "Historique", "historique"], ...(currentUser.role === "admin" ? [["⚙️", "Admin", "admin"]] : [])].map(([icon, label, s]) => (
          <button key={label} onClick={() => setScreen(s)} style={S.navBtn(screen === s)}>
            <span style={{ fontSize: 20 }}>{icon}</span>{label}
          </button>
        ))}
      </nav>
    </div>
  );
}
