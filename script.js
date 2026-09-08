document.addEventListener('DOMContentLoaded', () => {
  const elementsAnimes = document.querySelectorAll('.bloc-apparition, .apparition-scroll');

  if (!('IntersectionObserver' in window)) {
    elementsAnimes.forEach(el => el.classList.add('est-visible'));
    return;
  }

  const observateur = new IntersectionObserver((entrees) => {
    entrees.forEach(entree => {
      if (entree.isIntersecting) {
        entree.target.classList.add('est-visible');
        observateur.unobserve(entree.target);
      }
    });
  }, {
    threshold: 0.25,
    rootMargin: '0px 0px -80px 0px'
  });

  elementsAnimes.forEach(el => observateur.observe(el));
});

(() => {
  const chargeur = document.querySelector('.chargeur');
  if (!chargeur) return;

  if (document.documentElement.classList.contains('sans-intro')) {
    chargeur.remove();
    return;
  }

  document.body.classList.add('en-chargement');
  const video = chargeur.querySelector('video');

  const masquerChargeur = () => {
    chargeur.classList.add('est-cache');
    document.body.classList.remove('en-chargement');
    chargeur.addEventListener('transitionend', () => chargeur.remove(), { once: true });
  };

  if (video) {
    let masque = false;
    const executerMasquage = () => {
      if (masque) return;
      masque = true;
      masquerChargeur();
    };
    video.addEventListener('ended', executerMasquage);
    setTimeout(executerMasquage, 3500);
  } else {
    if (document.readyState === 'complete') {
      masquerChargeur();
    } else {
      window.addEventListener('load', masquerChargeur);
      setTimeout(masquerChargeur, 4000);
    }
  }
})();

(() => {
  const bouton = document.querySelector('.bouton-menu');
  const navMobile = document.querySelector('.nav-mobile');
  if (!bouton || !navMobile) return;

  const ouvrirMenu = () => {
    navMobile.classList.add('est-ouvert');
    bouton.setAttribute('aria-expanded', 'true');
    bouton.setAttribute('aria-label', 'Fermer le menu');
    document.body.classList.add('menu-ouvert');
  };

  const fermerMenu = () => {
    navMobile.classList.remove('est-ouvert');
    bouton.setAttribute('aria-expanded', 'false');
    bouton.setAttribute('aria-label', 'Ouvrir le menu');
    document.body.classList.remove('menu-ouvert');
  };

  bouton.addEventListener('click', () => {
    const estOuvert = bouton.getAttribute('aria-expanded') === 'true';
    estOuvert ? fermerMenu() : ouvrirMenu();
  });

  navMobile.querySelectorAll('a').forEach(lien => {
    lien.addEventListener('click', fermerMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fermerMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) fermerMenu();
  });
})();
