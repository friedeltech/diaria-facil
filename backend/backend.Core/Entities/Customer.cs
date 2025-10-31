namespace backend.Core.Entities;

public class Customer(string name, string email, string phoneNumber)
{
    public Guid Id { get; } = Guid.NewGuid();

    public string Name { get; private set; } = name ?? throw new ArgumentNullException(nameof(name));

    public string Email { get; private set; } = email ?? throw new ArgumentNullException(nameof(email));

    public string PhoneNumber { get; private set; } = phoneNumber ?? throw new ArgumentNullException(nameof(phoneNumber));

    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
    
    public DateTime UpdatedAt { get; private set; } = DateTime.UtcNow; 

    public void Update(Customer customer)
    {
        if(customer is null) throw new ArgumentNullException(nameof(customer));
        
        Name = customer.Name ?? throw new ArgumentNullException(nameof(Name));
        Email = customer.Email ?? throw new ArgumentNullException(nameof(Email));
        PhoneNumber = customer.PhoneNumber ?? throw new ArgumentNullException(nameof(PhoneNumber));
        UpdatedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Constructor usado para mapeamento em repositórios
    /// </summary>
    public Customer(Guid id, string name, string email, string phoneNumber, DateTime createdAt, DateTime updatedAt) : this(name, email, phoneNumber)
    {
        Id = id;
        CreatedAt = createdAt;
        UpdatedAt = updatedAt;
    }
}