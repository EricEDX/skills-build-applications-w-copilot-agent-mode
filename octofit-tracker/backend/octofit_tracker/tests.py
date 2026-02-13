from django.test import TestCase
from .models import Team, Activity, Leaderboard, Workout

class TeamTestCase(TestCase):
    def setUp(self):
        Team.objects.create(name="Marvel")
    def test_team_name(self):
        marvel = Team.objects.get(name="Marvel")
        self.assertEqual(marvel.name, "Marvel")

class ActivityTestCase(TestCase):
    def setUp(self):
        Activity.objects.create(user="ironman", type="run", duration=30)
    def test_activity_type(self):
        act = Activity.objects.get(user="ironman")
        self.assertEqual(act.type, "run")

class LeaderboardTestCase(TestCase):
    def setUp(self):
        Leaderboard.objects.create(user="ironman", score=100)
    def test_leaderboard_score(self):
        lb = Leaderboard.objects.get(user="ironman")
        self.assertEqual(lb.score, 100)

class WorkoutTestCase(TestCase):
    def setUp(self):
        Workout.objects.create(name="Cardio Blast", description="High intensity cardio workout")
    def test_workout_name(self):
        wo = Workout.objects.get(name="Cardio Blast")
        self.assertEqual(wo.name, "Cardio Blast")
