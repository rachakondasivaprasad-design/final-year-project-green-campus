const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const User = require('../models/User');
const EnvironmentalRecord = require('../models/EnvironmentalRecord');
const Alert = require('../models/Alert');
const Recommendation = require('../models/Recommendation');

dotenv.config({ path: './.env' });

const seedData = async () => {
  try {
    await connectDB();

    console.log('[Seed] Clearing existing collections...');
    await User.deleteMany();
    await EnvironmentalRecord.deleteMany();
    await Alert.deleteMany();
    await Recommendation.deleteMany();

    console.log('[Seed] Creating demo users...');
    const adminUser = await User.create({
      name: 'Dr. Aris Thorne (Campus Admin)',
      email: 'admin@greencampus.com',
      password: 'Password123!',
      role: 'ADMIN',
      department: 'Campus Sustainability Office'
    });

    const coordinatorUser = await User.create({
      name: 'Elena Vance (Eco Coordinator)',
      email: 'coordinator@greencampus.com',
      password: 'Password123!',
      role: 'COORDINATOR',
      department: 'Environmental Management'
    });

    const staffUser = await User.create({
      name: 'Marcus Brody (Facility Staff)',
      email: 'staff@greencampus.com',
      password: 'Password123!',
      role: 'STAFF',
      department: 'Facilities & Energy Operations'
    });

    const viewerUser = await User.create({
      name: 'Sarah Chen (Student Observer)',
      email: 'viewer@greencampus.com',
      password: 'Password123!',
      role: 'VIEWER',
      department: 'Student Council'
    });

    console.log('[Seed] Generating 12 months historical environmental records...');

    const buildings = [
      'Main Academic Block',
      'Science & Technology Block',
      'Student Hostel Complex',
      'Administration Building'
    ];

    const records = [];

    // Create 12 months of historical data for 2025-2026
    for (let month = 1; month <= 12; month++) {
      const year = 2025;

      buildings.forEach((building) => {
        // Base values per building
        let baseElec = building === 'Science & Technology Block' ? 14000 : 9500;
        let baseWater = building === 'Student Hostel Complex' ? 55000 : 32000;

        // Introduce seasonal variation
        const seasonalFactor = 1 + Math.sin((month / 12) * Math.PI * 2) * 0.15;

        // Anomaly: Spike Science Block electricity in month 12
        if (month === 12 && building === 'Science & Technology Block') {
          baseElec = 21500; // 50%+ surge
        }

        // Electricity
        records.push({
          category: 'Electricity',
          year,
          month,
          building,
          department: 'Facilities',
          metrics: {
            consumption: Math.round(baseElec * seasonalFactor),
            cost: Math.round(baseElec * seasonalFactor * 0.14)
          },
          notes: month === 12 && building === 'Science & Technology Block' ? 'High lab equipment usage alert recorded.' : 'Normal operational baseline.',
          recordedBy: staffUser._id
        });

        // Water
        records.push({
          category: 'Water',
          year,
          month,
          building,
          department: 'Plumbing',
          metrics: {
            consumption: Math.round(baseWater * seasonalFactor)
          },
          notes: 'Sub-meter reading confirmed.',
          recordedBy: staffUser._id
        });

        // Waste (monthly campus wide or building specific)
        records.push({
          category: 'Waste',
          year,
          month,
          building,
          department: 'Sanitation',
          metrics: {
            wasteType: 'Mixed Solid Waste',
            quantity: Math.round(1100 + Math.random() * 300),
            recycled: Math.round(750 + Math.random() * 200),
            nonRecycled: Math.round(350 + Math.random() * 100)
          },
          notes: 'Cafeteria recycling audit completed.',
          recordedBy: staffUser._id
        });

        // Paper
        records.push({
          category: 'Paper',
          year,
          month,
          building,
          department: 'Academic Printing',
          metrics: {
            consumption: Math.round(150 + Math.random() * 50)
          },
          notes: 'Digital submission policy active.',
          recordedBy: staffUser._id
        });
      });
    }

    // Add GreenSpace & Cleanliness entries
    records.push({
      category: 'GreenSpace',
      year: 2025,
      month: 12,
      building: 'Main Campus',
      department: 'Grounds',
      metrics: {
        totalArea: 125000,
        greenArea: 52500,
        trees: 1420,
        plants: 8500
      },
      notes: 'Botanical flora audit 2025.',
      recordedBy: coordinatorUser._id
    });

    records.push({
      category: 'Cleanliness',
      year: 2025,
      month: 12,
      building: 'Main Academic Block',
      department: 'Sanitation',
      metrics: {
        cleanlinessScore: 88,
        location: 'Floors 1-4 & Restrooms',
        remarks: 'Excellent cleanliness rating.'
      },
      notes: 'Routine quality audit.',
      recordedBy: coordinatorUser._id
    });

    await EnvironmentalRecord.insertMany(records);
    console.log(`[Seed] Inserted ${records.length} environmental records.`);

    // Seed Initial Alerts
    console.log('[Seed] Seeding initial alerts...');
    await Alert.create([
      {
        title: 'Electricity Surge Warning',
        category: 'Electricity',
        parameter: 'Consumption (kWh)',
        severity: 'CRITICAL',
        message: 'Science & Technology Block electricity consumption spiked by +52% compared to historical average.',
        status: 'ACTIVE',
        triggeredValue: 21500,
        thresholdValue: 14000,
        building: 'Science & Technology Block'
      },
      {
        title: 'Water Flow Baseline Anomaly',
        category: 'Water',
        parameter: 'Usage (Liters)',
        severity: 'WARNING',
        message: 'Student Hostel Complex water usage exceeded normal seasonal limit by 18%.',
        status: 'ACTIVE',
        triggeredValue: 64800,
        thresholdValue: 55000,
        building: 'Student Hostel Complex'
      },
      {
        title: 'Paper Reduction Target Achieved',
        category: 'Paper',
        parameter: 'Paper Reams',
        severity: 'INFO',
        message: 'Campus-wide paper consumption dropped 12% following online exam system rollout.',
        status: 'ACKNOWLEDGED',
        triggeredValue: 135,
        thresholdValue: 160,
        building: 'Administration Building'
      }
    ]);

    // Seed Initial Recommendations
    console.log('[Seed] Seeding initial AI recommendations...');
    await Recommendation.create([
      {
        title: 'Smart HVAC & Occupancy Sensor Integration',
        category: 'Electricity',
        parameter: 'Consumption (kWh)',
        issue: 'Science & Technology Block displays off-peak power spikes between 10 PM and 5 AM.',
        insight: 'HVAC systems are running continuously at full load regardless of room occupancy.',
        action: 'Install IoT micro-controllers connected to building automation with automatic thermal setback rules.',
        priority: 'HIGH',
        status: 'PROPOSED',
        estimatedImpact: 'Save ~3,200 kWh monthly ($450 savings)',
        building: 'Science & Technology Block'
      },
      {
        title: 'Automated Leak Detection Valves',
        category: 'Water',
        parameter: 'Usage (Liters)',
        issue: 'Hostel complex exhibits non-zero continuous baseline water flow at 3 AM.',
        insight: 'High probability of underground pipe seepage or running flush valves.',
        action: 'Perform pressure decay acoustic audit and replace faulty solenoid cutoff valves.',
        priority: 'HIGH',
        status: 'IN_PROGRESS',
        estimatedImpact: 'Conserve ~18,000 Liters water monthly',
        building: 'Student Hostel Complex'
      },
      {
        title: 'Cafeteria Organic Waste Composting Station',
        category: 'Waste',
        parameter: 'Recycling Ratio (%)',
        issue: 'Organic food waste constitutes 42% of un-recycled solid waste.',
        insight: 'Local organic composting could turn campus food waste into landscape fertilizer.',
        action: 'Deploy aerobic compost digesters behind central dining hall.',
        priority: 'MEDIUM',
        status: 'PROPOSED',
        estimatedImpact: 'Divert 4.2 tons waste from landfills annually',
        building: 'Main Campus'
      }
    ]);

    console.log('----------------------------------------------------');
    console.log('✔ SEED SUCCESSFUL!');
    console.log('Demo Credentials created:');
    console.log('  Admin:       admin@greencampus.com       / Password123!');
    console.log('  Coordinator: coordinator@greencampus.com / Password123!');
    console.log('  Staff:       staff@greencampus.com       / Password123!');
    console.log('  Viewer:      viewer@greencampus.com      / Password123!');
    console.log('----------------------------------------------------');

    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedData();
