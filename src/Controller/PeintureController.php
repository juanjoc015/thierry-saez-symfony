<?php

namespace App\Controller;

use App\Entity\Painting;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Liip\ImagineBundle\Imagine\Filter\FilterManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/peinture')]
class PeintureController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/', name: 'peinture')]
    public function index(): Response
    {
        // Obtener solo las pinturas de tipo "peinture"
        $paintings = $this->entityManager->getRepository(Painting::class)->findBy(['type' => 'peinture']);

        return $this->render('peinture/index.html.twig', [
            'paintings' => $paintings,
        ]);
    }

    #[Route('/project/{id}', name: 'project_peinture_show')]
    public function show(Painting $painting): Response
    {

        return $this->render('peinture/show.html.twig', [
            'painting' => $painting,
        ]);
    }

    
}
