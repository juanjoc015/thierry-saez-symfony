<?php

namespace App\Controller;

use App\Entity\Painting;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/collage')]
class CollageController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/', name: 'collage')]
    public function index(): Response
    {
        // Allez récupérer toutes les peintures de type "collage" dans la base de données
        // $peintures = $paintingRepository->findBy(['type' => 'collage']);
        $paintings = $this->entityManager->getRepository(Painting::class)->findBy(['type' => 'collage']);

        return $this->render('collage/index.html.twig', [
            'paintings' => $paintings,
        ]);
    }

    #[Route('/project/{id}', name: 'project_collage_show')]
    public function show(Painting $painting): Response
    {

        return $this->render('collage/show.html.twig', [
            'painting' => $painting,
        ]);
    }
    
}
