Fabricator(:entity) do
  # text { Faker::Lorem.word }
  text { Faker::Vehicle.manufacture }
  ktype { Faker::Vehicle.car_type}
end